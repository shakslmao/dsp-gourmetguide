import { db } from "@/db/prismadb";

export const getPasswordResetToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                token,
            },
        });

        return passwordResetToken;
    } catch (err) {
        return null;
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email,
            },
        });

        return passwordResetToken;
    } catch (err) {
        return null;
    }
};
