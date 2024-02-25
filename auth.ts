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
    callbacks: {
        /*
        async signIn({ user }) {
            const UserExists = await fetchUserId(user.id);

            if (!UserExists || !UserExists.emailVerified) {
                return false;
            }
            return true;
        },
         */

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
