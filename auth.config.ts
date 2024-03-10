import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginValidationSchema } from "./schemas";
import { fetchUserEmail } from "./data/user";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const fieldsValidated = LoginValidationSchema.safeParse(credentials);
                if (fieldsValidated.success) {
                    const { email, password } = fieldsValidated.data;

                    const user = await fetchUserEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }
                    // Check if the password is valid
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) return user;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
