import exp from "constants";
import * as z from "zod";

// Define a schema for login validation using 'z.object'.
// This schema is used to ensure the data provided for login meets specific criteria.
export const LoginValidationSchema = z.object({
    // Define a validation rule for the 'email' field.
    // It must be a string and a valid email format. If it fails validation, a custom message is provided.
    email: z.string().email({ message: "Your Email is Required!" }),

    // Define a validation rule for the 'password' field.
    // It must be a string with a minimum length of 1 character. A custom message is provided for validation failure.
    password: z.string().min(1, { message: "Your Password is Required!" }),
});

export const RegistrationValidationSchema = z
    .object({
        name: z.string().min(3, { message: "Name must be a minimum of 3 characters" }),

        email: z.string().email({ message: "Invalid Format" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number",
            })
            .regex(/[@$!%*#?&]/, {
                message: "Password must contain at least one special character",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const ResetPasswordValidationSchema = z.object({
    email: z.string().email({ message: "Your Email is Required!" }),
});

export const NewPasswordValidationSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "New assword must be at least 8 characters long" })
            .regex(/[a-z]/, {
                message: "New password must contain at least one lowercase letter",
            })
            .regex(/[A-Z]/, {
                message: "New assword must contain at least one uppercase letter",
            })
            .regex(/[0-9]/, {
                message: "New password must contain at least one number",
            })
            .regex(/[@$!%*#?&]/, {
                message: "New password must contain at least one special character",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const CuisinePrefsValidationSchema = z.object({
    selectedCuisines: z
        .array(z.string())
        .nonempty({ message: "Please select at least one cuisine" }),
});

export const PriceRangePrefsValidationSchema = z
    .object({
        priceRange: z.enum(["£", "££", "£££", "££££"]),
    })
    .refine((data) => data.priceRange !== undefined, {
        message: "Price range is required and must be one of '£', '££', '£££', '££££'.",
    });

export type TLoginValidationSchema = z.infer<typeof LoginValidationSchema>;
export type TRegistrationValidationSchema = z.infer<typeof RegistrationValidationSchema>;
export type TResetValidationSchema = z.infer<typeof ResetPasswordValidationSchema>;
export type TNewPasswordValidationSchema = z.infer<typeof NewPasswordValidationSchema>;
export type TCuisinePreferencesValidationSchema = z.infer<typeof CuisinePrefsValidationSchema>;
export type TPriceRangePrefsValidationSchema = z.infer<typeof PriceRangePrefsValidationSchema>;
