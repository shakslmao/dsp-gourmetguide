import { db } from "@/db/prismadb";

export const geVerificationToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token },
        });
        return verificationToken;
    } catch (err) {
        return null;
    }
};

export const getEmailVerificationToken = async (email: string) => {
    try {
        const emailVerificationToken = await db.verificationToken.findFirst({
            where: { email },
        });
        return emailVerificationToken;
    } catch (err) {
        return null;
    }
};
