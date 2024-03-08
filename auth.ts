import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db/prismadb";
import { fetchUserId } from "./data/user";
import { PriceRange, Prisma } from "@prisma/client";
import { UserCuisinePreferences } from "./types/UserPreferencesTypes";

const stringToPriceRange: { [key: string]: PriceRange } = {
    "No Preference": PriceRange.NO_PREFERENCE,
    "Very Low Prices": PriceRange.VERY_LOW,
    "Low Prices": PriceRange.LOW,
    "Medium Prices": PriceRange.MEDIUM,
    "High Prices": PriceRange.HIGH,
    "Very High Prices": PriceRange.VERY_HIGH,
};

const getPreferencesFromProfile = (
    profile: any
): UserCuisinePreferences & { priceRangePreference: PriceRange } => {
    const {
        cuisinePreference,
        dietaryRestrictions,
        priceRangePreference,
        preferredTime,
        preferredLocations,
        currentLocation,
        recommendationRadius,
        ambienceTypes,
        prefersMichelinRated,
        accessibilityFeatures,
    } = profile;

    return profile;
};

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user, profile }) {
            const preferences = await db.preferences.findUnique({
                where: { userId: user.id },
            });

            if (!preferences) {
                const userPreferences: UserCuisinePreferences = getPreferencesFromProfile(profile);
                const newPreferences = await db.preferences.create({
                    data: {
                        ...userPreferences,
                        userId: user.id,
                    },
                });

                await db.user.update({
                    where: { id: user.id },
                    data: { emailVerified: new Date(), preferencesId: newPreferences.id },
                });
            } else {
                await db.user.update({
                    where: { id: user.id },
                    data: { emailVerified: new Date(), preferencesId: preferences.id },
                });
            }
        },
    },

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            }
            const UserExists = await fetchUserId(user.id);

            if (!UserExists?.emailVerified) {
                return false;
            }
            return true;
        },

        async session({ session, token }) {
            console.log({ sessToken: token, session });

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },

        async jwt({ token }) {
            console.log({ token });
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
