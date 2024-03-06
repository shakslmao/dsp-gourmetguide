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

    try {
        const newUser = await db.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });
            await prisma.preferences.create({
                data: {
                    ...preferences,
                    userId: user.id,
                },
            });

            return user;
        });
        const verificationToken = await createVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "User created successfully", user: newUser };
    } catch (error) {
        console.error("Error creating user:", error);
        return { error: "An error occurred while creating the user" };
    }
};
