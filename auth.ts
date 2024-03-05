import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db/prismadb";
import { fetchUserEmail, fetchUserId } from "./data/user";

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
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials ") {
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
