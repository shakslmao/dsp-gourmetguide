"use server";

import bcrypt from "bcryptjs";
import { db } from "@/db/prismadb";
import { RegistrationValidationSchema, TRegistrationValidationSchema } from "@/schemas";
import { createVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { PriceRange } from "@prisma/client";
import { YelpAPIWithPrefs } from "@/lib/yelpAPIPrefs";
import { fetchYelpDataForLocations } from "@/lib/yelpMultipleLocations";

const stringToPriceRange: { [key: string]: PriceRange } = {
    "No Preference": PriceRange.NO_PREFERENCE,
    "Bargain ": PriceRange.VERY_LOW,
    "Budget-Friendly": PriceRange.LOW,
    "Moderate ": PriceRange.MEDIUM,
    "Premium ": PriceRange.HIGH,
    "Luxury ": PriceRange.VERY_HIGH,
};

const flaskEndPoint = "http://127.0.0.1:5000/receive_data";
const flaskEndPointForLocations = "http://127.0.0.1:5000/receive_preferred_loc";

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

    // If the user does not exist, create a new user and preferences record in the database.
    try {
        // Use Prisma's $transaction method to create a new user and preferences record in a single transaction.

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        console.log("New user created with ID:", user.id);
        // If user preferences are provided, create a new preferences record and associate it with the user.
        if (data.preferences) {
            const priceRangeEnum = stringToPriceRange[data.preferences.priceRangePreference];
            const preferencesResult = await db.preferences.create({
                data: {
                    // Spread the preferences object and add the userId.
                    ...data.preferences,
                    priceRangePreference: priceRangeEnum,
                    userId: user.id,
                },
            });

            // Update the user record with the preferencesId.
            await db.user.update({
                where: { id: user.id },
                data: { preferencesId: preferencesResult.id },
            });
            console.log("Preferences Result: ", preferencesResult);
        } else {
            console.warn("No preferences provided for user");
        }

        // Call the Yelp API with the user's preferences.
        if (data.preferences) {
            const yelpResponse = await YelpAPIWithPrefs(data.preferences);

            for (const business of yelpResponse.businesses) {
                const { id, name, categories, rating, coordinates, price, location, phone } =
                    business;

                const restaurantData = {
                    yelpId: id,
                    alias: business.alias,
                    restaurantName: name,
                    imageUrl: business.image_url,
                    isClosed: business.is_closed,
                    categories: categories.map((cat: any) => cat.title + ", " + cat.alias),
                    reviewCount: business.review_count,
                    customerRatings: rating,
                    coordinates: coordinates
                        ? { latitude: coordinates.latitude, longitude: coordinates.longitude }
                        : { latitude: null, longitude: null },
                    price: price ? price.length : null,
                    phone: phone,
                    displayPhone: business.display_phone,
                    location: {
                        create: {
                            address1: location.address1,
                            address2: location.address2,
                            address3: location.address3,
                            city: location.city,
                            zipCode: location.zip_code,
                            country: location.country,
                            state: location.state,
                            displayAddress: location.display_address.join(", "),
                            longitude: coordinates ? coordinates.longitude : null,
                            latitude: coordinates ? coordinates.latitude : null,
                        },
                    },
                };

                await db.restaurant.upsert({
                    where: { yelpId: business.id },
                    update: restaurantData,
                    create: restaurantData,
                });
            }

            // Send data to Django endpoint for data preprocessing
            const response = await fetch(flaskEndPoint, {
                // Note the change in URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(yelpResponse),
            });
            if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                console.log("Response from Flask: ", responseData);
            } else {
                console.error("Error in response from Flask: ", response);
            }
        }

        // Call the Second Yelp API with the user's preferred locations if it exists.
        if (data.preferences?.preferredLocations) {
            const yelpLocations = await fetchYelpDataForLocations(data.preferences);

            // Send data to Django endpoint for data preprocessing
            const response = await fetch(flaskEndPointForLocations, {
                // Note the change in URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(yelpLocations),
            });
            if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                console.log("Response from Flask: ", responseData);
            } else {
                console.error("Error in response from Flask: ", response);
            }
        }
        const verificationToken = await createVerificationToken(email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return { success: "User created successfully", user };
    } catch (error) {
        console.error("Error creating user:", error);
        return { error: "An error occurred while creating the user" };
    }
};
