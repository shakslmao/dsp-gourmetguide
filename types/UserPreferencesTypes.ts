import { SocialVisibility } from "@prisma/client";

export interface UserPreferences {
    cuisineTypes: string[];
    dietryRestrictions: string[];
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

export interface UserPreferencesContextType {
    preferences: UserPreferences;
    updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
}
