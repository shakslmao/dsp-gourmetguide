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
import { fetchUserRecommendations } from "@/hooks/get-user-recommendations";
import {
    isValidRecommendationContextType,
    RecommendationContextType,
} from "@/types/RecommendationTypes";

const DashboardPage = () => {
    const { currentUser, userPreferences } = useCurrentUser() || {};
    const [recommendations, setRecommendations] = useState<RecommendationContextType>({
        recommendedUserLocationRestaurants: [],
        recommendedUserPreferredLocationRestaurants: [],
        recommendedFakeRestaurants: [],
    });

    useEffect(() => {
        if (currentUser?.id) {
            fetchUserRecommendations(currentUser.id).then((data) => {
                if (data && isValidRecommendationContextType(data)) {
                    setRecommendations(data);
                } else {
                    setRecommendations({
                        recommendedUserLocationRestaurants: [],
                        recommendedUserPreferredLocationRestaurants: [],
                        recommendedFakeRestaurants: [],
                    });
                }
            });
        } else {
            setRecommendations({
                recommendedUserLocationRestaurants: [],
                recommendedUserPreferredLocationRestaurants: [],
                recommendedFakeRestaurants: [],
            });
        }
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
                    {recommendations && (
                        <div>
                            <h2 className="text-xs">Recommended Restaurants</h2>
                            {[...recommendations.recommendedFakeRestaurants].map(
                                (restaurant, index) => (
                                    <div key={index}>
                                        <h3>{restaurant.restaurantName}</h3>
                                        <p>{restaurant.cuisines.join(", ")}</p>
                                    </div>
                                )
                            )}
                            {[
                                ...recommendations.recommendedUserLocationRestaurants,
                                ...recommendations.recommendedUserPreferredLocationRestaurants,
                            ].map((restaurant, index) => (
                                <div key={index}>
                                    <h3>{restaurant.restaurantName}</h3>
                                    <p>{restaurant.categories.join(", ")}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
