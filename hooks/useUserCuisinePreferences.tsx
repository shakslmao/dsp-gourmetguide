"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import {
    UserCuisinePreferences,
    UserCuisinePreferencesContextType,
} from "@/types/UserPreferencesTypes";

// Define the default user preferences for the application.
const defaultUserPrefs: UserCuisinePreferences = {
    cuisineTypes: [], // List of preferred cuisines, initially empty.
    dietaryRestrictions: [], // Dietary restrictions of the user, initially none.
    priceSensitivity: 0, // User's sensitivity to price, 0 indicates no preference.
    prefferedTime: "", // Preferred dining time, initially unspecified.
    preferredLocations: [], // Preferred dining locations, initially unspecified.
    recommendationRadius: 0, // Radius for recommendations, initially set to 0.
    mealTypes: [], // Types of meals preferred, initially unspecified.
    ambienceTypes: [], // Preferred ambience types, initially unspecified.
    accessibilityFeatures: [], // Accessibility features required, initially unspecified.
    favouriteCuisines: [], // User's favourite cuisines, initially unspecified.
    socialVisibilityPreferences: null, // Preferences for social visibility, initially null.
};

// Create a context for UserPreferences with an undefined default value.
const UserCuisinePreferencesContext = createContext<UserCuisinePreferencesContextType | undefined>(
    undefined
);

// Custom hook to use the UserPreferences context.
export const useUserPreferences = (): UserCuisinePreferencesContextType => {
    const context = useContext(UserCuisinePreferencesContext);
    if (context === undefined) {
        throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
    }
    return context;
};

// Provider component for UserPreferences, allowing state management for user preferences.
export const UserCuisinePreferencesProvider = ({ children }: { children: ReactNode }) => {
    const [preferences, setPreferences] = useState<UserCuisinePreferences>(defaultUserPrefs); // Initialise state with default preferences.

    // Function to update user preferences with new values.
    const updatePreferences = (newPreferences: Partial<UserCuisinePreferences>) => {
        setPreferences((prevPreferences) => ({
            ...prevPreferences,
            ...newPreferences,
        }));
    };

    // Provide the context to children components.
    return (
        <UserCuisinePreferencesContext.Provider value={{ preferences, updatePreferences }}>
            {children}
        </UserCuisinePreferencesContext.Provider>
    );
};
