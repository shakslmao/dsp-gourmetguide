import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
    const session = useSession();
    const [currentUser, setCurrentUser] = useState(session.data?.user);
    const [userPreferences, setUserPreferences] = useState<UserCuisinePreferences | null>(null);

    useEffect(() => {
        const fetchUserPreferences = async () => {
            if (currentUser && currentUser.email) {
                try {
                    console.log("Fetching user preferences for", currentUser.email);
                    const response = await fetch(`/app/api/preferences?email=${currentUser.email}`);
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
        fetchUserPreferences();
    }, [currentUser]);

    return { currentUser, userPreferences };
};
