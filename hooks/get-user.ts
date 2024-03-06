"use client";

import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const session = useSession();
    const currentUser = session.data?.user;
    const [userPreferences, setUserPreferences] = useState<UserCuisinePreferences | null>(null);
    const isUserLoggedIn = !!currentUser && Object.keys(currentUser).length > 0;

    useEffect(() => {
        const fetchUserPreferences = async () => {
            if (isUserLoggedIn && currentUser.email) {
                try {
                    console.log("Fetching user preferences for", currentUser.email);
                    const response = await fetch(`/api/preferences?id=${currentUser.id}`);
                    const data = await response.json();

                    if (response.ok) {
                        console.log("User preferences fetched successfully:", data);
                        setUserPreferences(data);
                    } else {
                        console.error("Failed to fetch user preferences", data.error);
                    }
                } catch (error) {
                    console.warn("Current user or email is not available.");
                }
            }
        };
        if (isUserLoggedIn) {
            fetchUserPreferences();
        }
    }, [currentUser, currentUser?.id, isUserLoggedIn]);

    return isUserLoggedIn ? { currentUser, userPreferences } : null;
};
