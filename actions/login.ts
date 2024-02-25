"use server";

import { LoginValidationSchema, TLoginValidationSchema } from "@/schemas";
import { signIn } from "@/auth";

export const login = async (data: TLoginValidationSchema) => {
    const fieldsValidated = LoginValidationSchema.safeParse(data);
    if (!fieldsValidated.success) {
        return { error: "Fields are not valid" };
    }

    const { email, password } = fieldsValidated.data;

    return { success: "Sent" };
};
