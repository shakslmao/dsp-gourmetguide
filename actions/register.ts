"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db/prismadb";
import { RegistrationValidationSchema, TRegistrationValidationSchema } from "@/schemas";

// Define an async function to handle user registration.
export const register = async (data: TRegistrationValidationSchema) => {
    // Validate the incoming data against the RegistrationValidationSchema.
    const fieldsValidated = RegistrationValidationSchema.safeParse(data);
    // If validation fails, return an error object.
    if (!fieldsValidated.success) {
        return { error: "Fields are not valid" };
    }

    // Destructure the validated data to extract email, password, and firstName.
    const { email, password, firstName } = fieldsValidated.data;

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

    // If a user with the same email is found, return an error object.
    if (existingUser) {
        return { error: "User already exists" };
    }

    // If no existing user is found, create a new user record in the database with the provided details.
    await db.user.create({
        data: {
            firstName,
            email,
            password: hashedPassword,
        },
    });

    // Placeholder for sending a verification email to the user.

    // Return a success message once the user is created and the verification email is sent.
    return { success: "Sent" };
};
