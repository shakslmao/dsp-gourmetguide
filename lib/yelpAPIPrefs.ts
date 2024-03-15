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
    // Constructing categories string from cuisine types array.
    const categories = preferences.cuisineTypes.join(",");
    // Converting price range preference to a string value.
    const price = convertPriceRange(preferences.priceRangePreference);
    // Setting up query parameters for Yelp API request.
    const params = new URLSearchParams({
        term: "restaurants",
        // Use current location or a default value if not provided.
        location: preferences.currentLocation || "default_location",
        // Convert recommendation radius to meters, or use default value.
        radius: preferences.recommendationRadius
            ? String(preferences.recommendationRadius * 1000)
            : "30000", // Default radius if not provided
        categories: categories,
        price: price,
        limit: "20", // Limiting the results to 20.
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
        // Returning the response data directly.
        return response.data;
    } catch (error) {
        // Logging and throwing an error if the API call fails.
        console.error("Error fetching data from Yelp:", error);
        throw new Error("An error occurred while fetching data from Yelp.");
    }
};
