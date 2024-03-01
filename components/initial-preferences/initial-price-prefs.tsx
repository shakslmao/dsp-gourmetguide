"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";

export const InitialPricePrefs = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    console.log(preferences);
    return (
        <div>
            <h1>Price Preferences</h1>
        </div>
    );
};
