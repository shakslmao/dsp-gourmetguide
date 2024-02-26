"use server";

import { fetchUserEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { createResetPasswordToken } from "@/lib/tokens";
import { ResetPasswordValidationSchema, TResetValidationSchema } from "@/schemas";

export const resetPassword = async (data: TResetValidationSchema) => {
    const fieldsValidated = ResetPasswordValidationSchema.safeParse(data);

    if (!fieldsValidated.success) {
        return { error: "Invalid Email" };
    }

    const { email } = fieldsValidated.data;
    const userExists = await fetchUserEmail(email);
    if (!userExists) {
        return { error: "User does not exist" };
    }

    // Send email with token
    const resetToken = await createResetPasswordToken(email);
    await sendResetPasswordEmail(resetToken.email, resetToken.token);

    return { success: "Password Reset Email Sent" };
};
