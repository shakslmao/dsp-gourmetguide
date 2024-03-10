"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db/prismadb";
import { RegistrationValidationSchema, TRegistrationValidationSchema } from "@/schemas";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { PriceRange } from "@prisma/client";

const stringToPriceRange: { [key: string]: PriceRange } = {
    "No Preference": PriceRange.NO_PREFERENCE,
    "Bargain ": PriceRange.VERY_LOW,
    "Budget-Friendly": PriceRange.LOW, // Instead of "Economical"
    "Moderate ": PriceRange.MEDIUM,
    "Premium ": PriceRange.HIGH,
    "Luxury ": PriceRange.VERY_HIGH,
};

// Define an async function to handle user registration.
export const register = async (
    data: TRegistrationValidationSchema & { preferences?: UserCuisinePreferences }
) => {
    console.log("Recieved Data: ", JSON.stringify(data, null, 2));
    // Validate the incoming data against the RegistrationValidationSchema.
    const fieldsValidated = RegistrationValidationSchema.safeParse(data);
    // If validation fails, return an error object.
    if (!fieldsValidated.success) {
        console.error("Validation failed for registration data:", fieldsValidated.error);
        return { error: "Fields are not valid" };
    }

    // Destructure the validated data to extract email, password, and firstName.
    const { email, password, name } = fieldsValidated.data;

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
            console.log("New user created with ID:", user.id);
            if (data.preferences) {
                const priceRangeEnum = stringToPriceRange[data.preferences.priceRangePreference];
                const preferencesResult = await prisma.preferences.create({
                    data: {
                        ...data.preferences,
                        priceRangePreference: priceRangeEnum,
                        userId: user.id,
                    },
                });

                await prisma.user.update({
                    where: { id: user.id },
                    data: { preferencesId: preferencesResult.id },
                });
                console.log("Preferences Result: ", preferencesResult);
            } else {
                console.warn("No preferences provided for user");
            }

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
