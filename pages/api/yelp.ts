import axios from "axios";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { PriceRange } from "@prisma/client";

export default async function fetchYelpData(
    latitude: number,
    longitude: number,
    preferences: UserCuisinePreferences
) {
    const url = "https://api.yelp.com/v3/businesses/search";
    const api_key = process.env.YELP_API_KEY;
    const priceMap = {
        [PriceRange.NO_PREFERENCE]: "",
        [PriceRange.VERY_LOW]: "1",
        [PriceRange.LOW]: "2",
        [PriceRange.MEDIUM]: "3",
        [PriceRange.HIGH]: "4",
        [PriceRange.VERY_HIGH]: "4",
    };

    // Map the user's preference to Yelp's expected format
    const price: string = priceMap[preferences.priceRangePreference] || "";
    const categories: string = preferences.cuisineTypes.join(",");

    const params = new URLSearchParams({
        term: "restaurants",
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        limit: "50",
        categories,
        price,
    });

    const headers = {
        Authorization: `Bearer ${api_key}`,
    };

    try {
        const response = await axios.get(url, { params, headers });
        // Consider saving this data or further processing as needed
        console.log(JSON.stringify(response.data, null, 4));
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
    }
}
