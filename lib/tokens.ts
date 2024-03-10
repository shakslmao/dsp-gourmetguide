import { db } from "@/db/prismadb";
import { v4 as uuidv4 } from "uuid";
import { getEmailVerificationToken } from "@/data/email-verification-token";

export const createVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 36000 * 1000);
    const tokenExists = await getEmailVerificationToken(email);
    if (tokenExists) {
        await db.verificationToken.delete({
            where: {
                id: tokenExists.id,
            },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            token,
            email,
            expires,
        },
    });

    return verificationToken;
};

export const createResetPasswordToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 36000 * 1000);
    const tokenExists = await getEmailVerificationToken(email);
    if (tokenExists) {
        await db.passwordResetToken.delete({
            where: {
                id: tokenExists.id,
            },
        });
    }

    const resetPasswordToken = await db.passwordResetToken.create({
        data: {
            token,
            email,
            expires,
        },
    });

    return resetPasswordToken;
};
