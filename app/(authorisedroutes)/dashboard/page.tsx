"use client";

import { useCurrentUser } from "@/hooks/get-user-prefs";
import React, { useState, useEffect } from "react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { fetchUserRecommendations } from "@/pages/api/get-user-recommendations";
import {
    isValidRecommendationContextType,
    RecommendationContextType,
} from "@/types/RecommendationTypes";
import { fetchUserRec } from "@/data/user";

const DashboardPage = () => {
    const { currentUser, userPreferences } = useCurrentUser() || {};
    const [recommendations, setRecommendations] = useState<RecommendationContextType>({
        recommendedUserLocationRestaurants: [],
        recommendedUserPreferredLocationRestaurants: [],
        recommendedFakeRestaurants: [],
    });

    const fetchData = async () => {
        if (currentUser?.id) {
            try {
                const data = await fetchUserRecommendations(currentUser.id);
                if (data === null) {
                    console.log("No recommendations found for the user.");
                    // Set the state to reflect no data or display a message
                } else if (isValidRecommendationContextType(data)) {
                    setRecommendations(data);
                } else {
                    // The data doesn't match the expected type
                    console.error("Received data does not match the expected format.");
                }
            } catch (error) {
                console.error("Error fetching recommendation data:", error);
                // Optionally, update the UI to reflect that an error occurred
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentUser?.id]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Hello {currentUser?.name} <br />
                    <span className="text-green-600">Here is what we think you may like</span>.
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground text-gray-900"></p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        <Drawer>
                            <DrawerTrigger>
                                <Button className={buttonVariants({ size: "sm" })}>
                                    Check your preferences
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Your Current Preferences</DrawerTitle>
                                    <DrawerDescription>
                                        {userPreferences ? (
                                            JSON.stringify(userPreferences)
                                        ) : (
                                            <p>Loading user preferences...</p>
                                        )}
                                    </DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <DrawerClose>
                                        <Button
                                            className={buttonVariants({
                                                size: "sm",
                                                variant: "ghost",
                                            })}>
                                            Close
                                        </Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
                <div>
                    <h2 className="text-xs">Recommended Fake Restaurants</h2>
                    {recommendations && JSON.stringify(recommendations.recommendedFakeRestaurants)}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
