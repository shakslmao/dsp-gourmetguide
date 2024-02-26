"use server";

import { LoginValidationSchema, TLoginValidationSchema } from "@/schemas";
import { signIn } from "@/auth";
import { LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { fetchUserEmail } from "@/data/user";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (data: TLoginValidationSchema) => {
    const fieldsValidated = LoginValidationSchema.safeParse(data);
    if (!fieldsValidated.success) {
        return { error: "Fields are not valid" };
    }

    const { email, password } = fieldsValidated.data;
    const currentUser = await fetchUserEmail(email);
    if (!currentUser || !currentUser.email || !currentUser.password) {
        return { error: "Invalid Credentials" };
    }

    if (!currentUser.emailVerified) {
        const verificationToken = await createVerificationToken(currentUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "Email Confirmation Sent" };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: LOGIN_REDIRECT,
        });
    } catch (err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" };
                default:
                    return { error: "An error occurred" };
            }
        }
        throw err;
    }
    return { success: "Sent" };
};
