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

function convertPriceRange(priceRange: PriceRange) {
    switch (priceRange) {
        case PriceRange.NO_PREFERENCE:
            return "1,2,3,4";
        case PriceRange.VERY_LOW:
            return "1";
        case PriceRange.LOW:
            return "2";
        case PriceRange.MEDIUM:
            return "3";
        case PriceRange.HIGH:
        case PriceRange.VERY_HIGH:
            return "4";
        default:
            // Default case to handle undefined or unexpected values, returns all price ranges.
            return "1,2,3,4";
    }
}

// Flask Endpoints for data preprocessing
const flaskEndPoint = "http://127.0.0.1:5000/recommendations_for_current_location";
const flaskEndPointFakeData = "http://127.0.0.1:5000/recommendations_for_fake_data";
const flaskEndPointForLocations = "http://127.0.0.1:5000/recommendations_for_preferred_locations";

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
            const preferencesId = user.preferencesId;
            const restaurantId = []; // Initialise an empty array to collect restaurant IDs
            const restaurntName = [];

            for (const business of yelpResponse.businesses) {
                const { id } = business;

                // Check if the restaurant already exists, and if not, create it
                const restaurant = await db.restaurant.upsert({
                    where: { yelpId: id },
                    update: {}, // TODO: --> Handle Duplicate Entries
                    create: {
                        yelpId: id,
                        alias: business.alias,
                        restaurantName: business.name,
                        imageUrl: business.image_url,
                        isClosed: business.is_closed,
                        categories: business.categories.map(
                            (cat: any) => cat.title + ", " + cat.alias
                        ),
                        reviewCount: business.review_count,
                        customerRatings: business.rating,
                        coordinates: {
                            latitude: business.coordinates.latitude,
                            longitude: business.coordinates.longitude,
                        },
                        price: business.price ? business.price.length : null,
                        phone: business.phone,
                        displayPhone: business.display_phone,
                        Location: {
                            create: {
                                address1: business.location.address1,
                                address2: business.location.address2,
                                address3: business.location.address3,
                                city: business.location.city,
                                zipCode: business.location.zip_code,
                                country: business.location.country,
                                state: business.location.state,
                                displayAddress: business.location.display_address.join(", "),
                                longitude: business.coordinates.longitude,
                                latitude: business.coordinates.latitude,
                            },
                        },
                    },
                });

                // Collect the created or found restaurant's ID
                restaurantId.push(restaurant.id);
                restaurntName.push(restaurant.restaurantName);
            }

            // Now, update the user record with the collected restaurant IDs
            await db.user.update({
                where: { id: user.id },
                data: {
                    restaurantId: { set: [...restaurantId, ...user.restaurantId] },
                    restaurantName: {
                        set: [...restaurntName, ...restaurntName].filter(
                            (name): name is string => name !== null
                        ),
                    },
                },
            });

            // Send data to Django endpoint for data preprocessing
            const response = await fetch(flaskEndPoint, {
                // Note the change in URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    preferencesId: user.preferencesId,
                    yelpResponse,
                }),
            });

            if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                console.log("Response from Flask User Locations: ", responseData);
                console.log("User ID: ", user.id);
                console.log("Preferences ID: ", preferencesId);
            } else {
                console.error("Error in response from Flask: ", response);
            }
        }

        // Call the Second Yelp API with the user's preferred locations if it exists.
        if (data.preferences?.preferredLocations) {
            const yelpLocations = await fetchYelpDataForLocations(data.preferences);
            const preferencesId = user.preferencesId;
            const restaurantId = [];
            const restaurantName = [];

            for (const [location, data] of Object.entries(yelpLocations)) {
                const restaurants = data.businesses;
                if (!Array.isArray(restaurants)) {
                    console.error(
                        `Expected restaurants to be an array, got: ${typeof restaurants}`
                    );
                    continue;
                }
                for (const item of restaurants) {
                    const preferredRestaurants = await db.restaurant.upsert({
                        where: { yelpId: item.id },
                        update: {},
                        create: {
                            yelpId: item.id,
                            alias: item.alias,
                            restaurantName: item.name,
                            imageUrl: item.image_url,
                            isClosed: item.is_closed,
                            categories: item.categories.map(
                                (cat: any) => cat.title + ", " + cat.alias
                            ),
                            reviewCount: item.review_count,
                            customerRatings: item.rating,
                            coordinates: {
                                latitude: item.coordinates.latitude,
                                longitude: item.coordinates.longitude,
                            },
                            price: item.price ? item.price.length : null,
                            phone: item.phone,
                            displayPhone: item.display_phone,
                            Location: {
                                create: {
                                    address1: item.location.address1,
                                    address2: item.location.address2,
                                    address3: item.location.address3,
                                    city: item.location.city,
                                    zipCode: item.location.zip_code,
                                    country: item.location.country,
                                    state: item.location.state,
                                    displayAddress: item.location.display_address.join(", "),
                                    longitude: item.coordinates.longitude,
                                    latitude: item.coordinates.latitude,
                                },
                            },
                        },
                    });
                    restaurantId.push(preferredRestaurants.id);
                    restaurantName.push(preferredRestaurants.restaurantName);
                }
            }
            await db.user.update({
                where: { id: user.id },
                data: {
                    restaurantId: { set: [...restaurantId, ...user.restaurantId] },
                    restaurantName: {
                        set: [...restaurantName, ...restaurantName].filter(
                            (name): name is string => name !== null
                        ),
                    },
                },
            });

            // Send data to Django endpoint for data preprocessing
            const response = await fetch(flaskEndPointForLocations, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    preferencesId: user.preferencesId,
                    yelpLocations,
                }),
            });
            if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();
                console.log("Response from Flask for Preferred Locations: ", responseData);
                console.log("User ID: ", user.id);
                console.log("Preferences ID: ", preferencesId);
            } else {
                console.error("Error in response from Flask: ", response);
            }

            const responseForFakeData = await fetch(flaskEndPointFakeData, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    preferencesId: user.preferencesId,
                }),
            });

            if (
                responseForFakeData.ok &&
                responseForFakeData.headers.get("content-type")?.includes("application/json")
            ) {
                const responseData = await responseForFakeData.json();
                console.log("Response from Flask for Fake Data: ", responseData);
                console.log("User ID: ", user.id);
                console.log("Preferences ID: ", preferencesId);
            } else {
                console.error("Error in response from Flask for Fake Data: ", responseForFakeData);
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
