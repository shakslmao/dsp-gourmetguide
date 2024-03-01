import { SocialVisibility } from "@prisma/client";

export interface UserCuisinePreferences {
    cuisineTypes: string[];
    dietaryRestrictions: string[];
    priceSensitivity: number;
    prefferedTime: string;
    preferredLocations: string[];
    recommendationRadius: number;
    mealTypes: string[];
    ambienceTypes: string[];
    accessibilityFeatures: string[];
    favouriteCuisines: string[];
    socialVisibilityPreferences: SocialVisibility | null;
}

export interface UserCuisinePreferencesContextType {
    preferences: UserCuisinePreferences;
    updatePreferences: (newPreferences: Partial<UserCuisinePreferences>) => void;
}
