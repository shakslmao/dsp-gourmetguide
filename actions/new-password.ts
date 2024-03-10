import bcrypt from "bcryptjs";
import { NewPasswordValidationSchema, TNewPasswordValidationSchema } from "@/schemas";
import { getPasswordResetToken } from "@/data/password-reset-token";
import { fetchUserEmail } from "@/data/user";
import { db } from "@/db/prismadb";

export const newUserPassword = async (data: TNewPasswordValidationSchema, token: string | null) => {
    if (!token) {
        return { error: "Sorry, you are missing a reset token" };
    }

    const fieldsValidated = NewPasswordValidationSchema.safeParse(data);
    if (!fieldsValidated.success) {
        return { error: "Woops.. Invalid Fields!" };
    }

    const { password } = fieldsValidated.data;
    const tokenExists = await getPasswordResetToken(token);
    if (!tokenExists) {
        return { error: "Woops... Invalid Token" };
    }

    const tokenExpired = new Date(tokenExists.expires) < new Date();
    if (tokenExpired) {
        return { error: "Sorry, Token Expired" };
    }

    const currentUser = await fetchUserEmail(tokenExists.email);
    if (!currentUser) {
        return { error: "Sorry, User does not exist" };
    }

    const newHashedPassword = await bcrypt.hash(password, 12);
    await db.user.update({
        where: { id: currentUser.id },
        data: { password: newHashedPassword },
    });

    await db.passwordResetToken.delete({
        where: { id: tokenExists.id },
    });

    return { success: "Password Updated!" };
};
