import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginValidationSchema } from "./schemas";
import { fetchUserEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials, request) {
                const fieldsValidated = LoginValidationSchema.safeParse(credentials);
                if (fieldsValidated.success) {
                    const { email, password } = fieldsValidated.data;

                    const user = await fetchUserEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }
                    //
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) return user;
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
// Auth
