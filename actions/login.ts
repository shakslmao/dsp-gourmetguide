"use server";

import { LoginValidationSchema, TLoginValidationSchema } from "@/schemas";

export const login = async (data: TLoginValidationSchema) => {
    const fieldsValidated = LoginValidationSchema.safeParse(data);
    if (!fieldsValidated.success) {
        return { error: "Fields are not valid" };
    }

    return { success: "Sent" };
};
