"use client";

import { RecommendationState } from "@/types/RecommendationTypes";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const session = useSession();
    const currentUser = session.data?.user;
    const [userPreferences, setUserPreferences] = useState<UserCuisinePreferences | null>(null);
    const [userRecommendations, setUserRecommendations] = useState<RecommendationState | null>(
        null
    );
    const isUserLoggedIn = !!currentUser && Object.keys(currentUser).length > 0;

    useEffect(() => {
        const fetchUserPreferences = async () => {
            if (isUserLoggedIn && currentUser.email) {
                try {
                    const response = await fetch(`/api/preferences?id=${currentUser.id}`);
                    const data = await response.json();

                    if (response.ok) {
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

    useEffect(() => {
        const fetchUserRecommendations = async () => {
            if (isUserLoggedIn && currentUser.id) {
                try {
                    const response = await fetch(`/api/recommendations?userId=${currentUser?.id}`);
                    const data = await response.json();
                    5;
                    if (response.ok) {
                        setUserRecommendations(data);
                    } else {
                        console.error("Failed to fetch user recommendations", data.error);
                    }
                } catch (error) {
                    console.error("Failed to fetch user recommendations", error);
                }
            }
        };
        if (isUserLoggedIn) {
            fetchUserRecommendations();
        }
    }, [currentUser, currentUser?.id, isUserLoggedIn]);

    return isUserLoggedIn ? { currentUser, userPreferences, userRecommendations } : null;
};
