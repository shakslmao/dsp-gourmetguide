"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { UserPreferences, UserPreferencesContextType } from "@/types/UserPreferencesTypes";

// Define the default user preferences for the application.
const defaultUserPrefs: UserPreferences = {
    cuisineTypes: [], // List of preferred cuisines, initially empty.
    dietryRestrictions: [], // Dietary restrictions of the user, initially none.
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
const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

// Custom hook to use the UserPreferences context.
export const useUserPreferences = (): UserPreferencesContextType => {
    const context = useContext(UserPreferencesContext);
    if (context === undefined) {
        throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
    }
    return context;
};

// Provider component for UserPreferences, allowing state management for user preferences.
export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
    const [preferences, setPreferences] = useState<UserPreferences>(defaultUserPrefs); // Initialise state with default preferences.

    // Function to update user preferences with new values.
    const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
        setPreferences((prevPreferences) => ({
            ...prevPreferences,
            ...newPreferences,
        }));
    };

    // Provide the context to children components.
    return (
        <UserPreferencesContext.Provider value={{ preferences, updatePreferences }}>
            {children}
        </UserPreferencesContext.Provider>
    );
};
