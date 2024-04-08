"use server";

import { db } from "@/db/prismadb";

export const fetchUserRecommendations = async (id: string | undefined) => {
    try {
        const userRecommendations = await db.recommendationResult.findUnique({
            where: { id },
        });
        console.log("User Recommendation ID:", id);

        if (!userRecommendations) {
            return {
                recommendedUserLocationRestaurants: [],
                recommendedUserPreferredLocationRestaurants: [],
                recommendedFakeRestaurants: [],
            };
        }

        const {
            recommendedUserLocationRestaurants = [],
            recommendedUserPreferredLocationRestaurants = [],
            recommendedFakeRestaurants = [],
        } = userRecommendations || {};

        // Fetch restaurant data for each recommendation
        const userLocationRestaurantData = await Promise.all(
            recommendedUserLocationRestaurants.map(async (yelpId: any) => {
                const restaurant = await db.restaurant.findUnique({
                    where: { yelpId },
                });
                return restaurant;
            })
        );
        console.log("User Loc Data", userLocationRestaurantData);

        // Fetch restaurant data for each recommendation
        const userPreferredLocationRestaurantData = await Promise.all(
            recommendedUserPreferredLocationRestaurants.map(async (yelpId: any) => {
                const restaurant = await db.restaurant.findUnique({
                    where: { yelpId },
                });
                return restaurant;
            })
        );
        console.log(userPreferredLocationRestaurantData);

        // Fetch fake restaurant data for each recommendation
        const fakeRestaurantData = await Promise.all(
            recommendedFakeRestaurants.map(async (restaurantId: any) => {
                const restaurant = await db.fakeRestaurant.findUnique({
                    where: { restaurantId },
                });
                return restaurant;
            })
        );
        console.log(fakeRestaurantData);

        return {
            recommendedUserLocationRestaurants: userLocationRestaurantData,
            recommendedUserPreferredLocationRestaurants: userPreferredLocationRestaurantData,
            recommendedFakeRestaurants: fakeRestaurantData,
        };
    } catch (err) {
        console.error("Error fetching user recommendations:", err);
        return null;
    }
};
