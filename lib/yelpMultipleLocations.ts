import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { YelpAPIWithPrefs } from "./yelpAPIPrefs";

type YelpApiResponse = string;

export const fetchYelpDataForLocations = async (preferences: UserCuisinePreferences) => {
    // Explicitly declare results as an object with string keys and YelpApiResponse as values
    const results: Record<string, YelpApiResponse> = {};

    if (preferences.preferredLocations && preferences.preferredLocations.length > 0) {
        for (const location of preferences.preferredLocations) {
            let searchLocation = location;

            try {
                const yelpData = await YelpAPIWithPrefs({
                    ...preferences,
                    currentLocation: searchLocation,
                });
                results[location] = yelpData;
            } catch (error) {
                console.error(`Error fetching Yelp data for ${location}:`, error);
            }
        }
    }
    return results;
};
