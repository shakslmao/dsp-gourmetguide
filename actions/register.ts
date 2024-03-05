"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db/prismadb";
import { RegistrationValidationSchema, TRegistrationValidationSchema } from "@/schemas";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";

// Define an async function to handle user registration.
export const register = async (
    data: TRegistrationValidationSchema & { preferences: UserCuisinePreferences }
) => {
    // Validate the incoming data against the RegistrationValidationSchema.
    const fieldsValidated = RegistrationValidationSchema.safeParse(data);
    // If validation fails, return an error object.
    if (!fieldsValidated.success) {
        return { error: "Fields are not valid" };
    }

    // Destructure the validated data to extract email, password, and firstName.
    const { email, password, name, preferences } = fieldsValidated.data;

    // Define the number of salt rounds for bcrypt hashing.
    const saltRounds = 12;
    // Hash the password using bcrypt.
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Check if a user with the given email already exists in the database.
    const existingUser = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return { error: "User already exists" };
    }

    const createdPreferences = await db.preferences.create({
        data: {
            ...preferences,
        },
    });

    // If no existing user is found, create a new user record in the database with the provided details.
    const createdUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    await db.preferences.update({
        where: {
            id: createdPreferences.id,
        },
        data: {
            userId: createdUser.id,
        },
    });

    const verificationToken = await createVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    // Return a success message once the user is created and the verification email is sent.
    return { success: "Email Confirmation Sent" };
};
