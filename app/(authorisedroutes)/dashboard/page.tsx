"use client";

import { useCurrentUser } from "@/hooks/get-user-prefs";
import React, { useState, useEffect, use } from "react";
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
import {
    FakeRestaurantProps,
    isValidRecommendationContextType,
    RecommendationContextType,
} from "@/types/RecommendationTypes";
import { getUserRecommendations } from "@/pages/api/get-user-recommendations";

const DashboardPage = () => {
    const { currentUser, userPreferences } = useCurrentUser() || {};
    const [recommendations, setRecommendations] = useState<RecommendationContextType>();

    useEffect(() => {
        if (!currentUser) return;
        if (currentUser?.id) {
            getUserRecommendations(currentUser?.id)
                .then((data) => {
                    if (isValidRecommendationContextType(data)) {
                        setRecommendations(data);
                    } else {
                        console.error("Error", data);
                    }
                })
                .catch((error) => console.error("Error fetching user recommendations:", error));
        }
    }, [currentUser?.id]);
    console.log("Recommendations", recommendations);

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
                            <DrawerTrigger></DrawerTrigger>
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
            </div>
        </div>
    );
};

export default DashboardPage;
