import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { YelpAPIWithPrefs } from "./yelpAPIPrefs";

type YelpApiResponse = string;

// Function to fetch Yelp data for locations based on user cuisine preferences.
export const fetchYelpDataForLocations = async (preferences: UserCuisinePreferences) => {
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
