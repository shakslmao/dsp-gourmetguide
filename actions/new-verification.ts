"use server";

import { db } from "@/db/prismadb";
import { fetchUserEmail } from "@/data/user";
import { geVerificationToken } from "@/data/email-verification-token";

export const newVerificationToken = async (token: string) => {
    const existingVerficationToken = await geVerificationToken(token);
    if (!existingVerficationToken) {
        return { error: "The Token Does Not Exist!" };
    }

    const tokenHasExpired = new Date(existingVerficationToken.expires) < new Date();
    if (tokenHasExpired) {
        return { error: "The Token Has Expired!" };
    }

    const currentUser = await fetchUserEmail(existingVerficationToken.email);
    if (!currentUser) {
        return { error: "No User Found!" };
    }
    await db.user.update({
        where: { id: currentUser.id },
        data: {
            emailVerified: new Date(),
            email: existingVerficationToken.email,
        },
    });

    await db.verificationToken.delete({
        where: { id: existingVerficationToken.id },
    });

    return { success: "Your Email is Verified!" };
};
