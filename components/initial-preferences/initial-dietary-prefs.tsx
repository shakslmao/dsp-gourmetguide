"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";

export const InitialDietaryPrefs = () => {
    const { preferences } = useUserPreferences();
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    What are your <span className="text-green-600">dietary</span> preferences.
                </h1>
            </div>
        </div>
    );
};
