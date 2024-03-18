"use server";

import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { PriceRange } from "@prisma/client";
import axios from "axios";

// Function to convert a PriceRange enum value to a corresponding string value.
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

// async fetches restaurants from Yelp API based on user preferences.
export const YelpAPIWithPrefs = async (preferences: UserCuisinePreferences) => {
    const categories = preferences.cuisineTypes.join(",");
    const price = convertPriceRange(preferences.priceRangePreference);
    const location = preferences.currentLocation || "default_location";

    // Setting up query parameters for Yelp API request.
    const params = new URLSearchParams({
        term: "restaurants",
        location: location,
        radius: preferences.recommendationRadius
            ? String(preferences.recommendationRadius * 1000)
            : "30000",
        categories: categories,
        price: price,
        limit: "50",
    });

    try {
        // Making a GET request to Yelp API.
        const response = await axios.get("https://api.yelp.com/v3/businesses/search", {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`,
                "Content-Type": "application/json",
            },
            params,
        });

        // Filtering out restaurants with low ratings if the user prefers Michelin rated restaurants.
        let businesses = response.data.businesses;
        if (preferences.prefersMichelinRated) {
            businesses = businesses.filter((business: any) => business.rating >= 4.5);
        }
        // Returning the response data directly.
        return { ...response.data, businesses };
    } catch (error: any) {
        if (error.response) {
            // Logs more detailed response from Yelp in case of error
            console.error(
                `Yelp API responded with status ${error.response.status}: ${error.response.statusText}`
            );
            console.error(`Response data:`, error.response.data);
        } else {
            // Logs generic error if no response is available from Yelp
            console.error("Error fetching data from Yelp:", error);
        }
        throw new Error("An error occurred while fetching data from Yelp.");
    }
};
