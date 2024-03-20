"use server";

import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { YelpAPIWithPrefs } from "./yelpAPIPrefs";
type Restaurant = {
    alias: string;
    id: string;
    name: string;
    categories: { alias: string; title: string }[];
    rating: number;
    is_closed: boolean;
    review_count: number;
    display_phone: string;
    coordinates: { latitude: number; longitude: number };
    price: string;
    phone: string;
    image_url: string;
    location: {
        address1: string;
        address2?: string;
        address3?: string;
        city: string;
        zip_code: string;
        country: string;
        state: string;
        display_address: string[];
    };
};

type YelpApiResponse = {
    total: number;
    businesses: Restaurant[];
    region: { center: { longitude: number; latitude: number } };
};

// Function to fetch Yelp data for locations based on user cuisine preferences.
export const fetchYelpDataForLocations = async (
    preferences: UserCuisinePreferences
): Promise<Record<string, YelpApiResponse>> => {
    // Explicitly declares 'results' as an object with string keys and YelpApiResponse as values.
    const results: Record<string, YelpApiResponse> = {};

    // Checks if there are any preferred locations specified and if the array is not empty.
    if (preferences.preferredLocations && preferences.preferredLocations.length > 0) {
        // Iterates through the list of preferred locations.
        for (const location of preferences.preferredLocations) {
            let searchLocation = location; // Assigns the current location to 'searchLocation'.

            try {
                // Attempts to fetch Yelp data for the current location with the given preferences.
                const yelpData = await YelpAPIWithPrefs({
                    ...preferences, // Spreads the preferences to include in the request.
                    currentLocation: searchLocation, // Specifies the current location for the Yelp API request.
                });
                results[location] = yelpData; // Stores the fetched data in the 'results' object.
            } catch (error) {
                // Logs an error message to the console if the data fetch fails.
                console.error(`Error fetching Yelp data for ${location}:`, error);
            }
        }
    }
    return results; // Returns the 'results' object containing the Yelp data for each location.
};
