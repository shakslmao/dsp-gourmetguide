import { PriceRange, SocialVisibility } from "@prisma/client";

export interface UserCuisinePreferences {
    cuisineTypes: string[];
    dietaryRestrictions: string[];
    priceRangePreference: PriceRange;
    preferredTime: string[]; //
    preferredLocations: string[]; // city names
    currentLocation?: string;
    recommendationRadius: number; // in km
    ambienceTypes: string[];
    prefersMichelinRated: boolean;
    accessibilityFeatures: boolean;
    socialVisibilityPreferences: SocialVisibility | null;
}

export interface UserCuisinePreferencesContextType {
    preferences: UserCuisinePreferences;
    updatePreferences: (newPreferences: Partial<UserCuisinePreferences>) => void;
}
