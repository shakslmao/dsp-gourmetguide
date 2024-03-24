import { PriceRange } from "@prisma/client";

export interface UserCuisinePreferences {
    cuisineTypes: string[];
    dietaryRestrictions?: string[];
    priceRangePreference: PriceRange;
    preferredTime?: string[]; //
    preferredLocations?: string[]; // city names
    currentLocation: string | null;
    recommendationRadius: number; // in km
    ambienceTypes?: string[];
    prefersHigherRated?: boolean;
    accessibilityFeatures?: boolean;
    locationFeatureUsed: boolean;
    userCoordinates?: {
        latitude: number;
        longitude: number;
    };
}

export interface UserCuisinePreferencesContextType {
    preferences: UserCuisinePreferences;
    updatePreferences: (newPreferences: Partial<UserCuisinePreferences>) => void;
}
