"use server";

import { db } from "@/db/prismadb";

export const fetchUserRecommendations = async (userId: string | undefined) => {
    try {
        const userRecommendations = await db.recommendationResult.findUnique({
            where: { id: userId },
        });

        const {
            recommendedUserLocationRestaurants = [],
            recommendedUserPreferredLocationRestaurants = [],
            recommendedFakeRestaurants = [],
        } = userRecommendations || {};

        const userLocationRestaurantData = await Promise.all(
            recommendedUserLocationRestaurants.map(async (id: any) => {
                const restaurant = await db.restaurant.findUnique({
                    where: { yelpId: id },
                });
                return restaurant;
            })
        );
        console.log(userLocationRestaurantData);

        const userPreferredLocationRestaurantData = await Promise.all(
            recommendedUserPreferredLocationRestaurants.map(async (id: any) => {
                const restaurant = await db.restaurant.findUnique({
                    where: { yelpId: id },
                });
                return restaurant;
            })
        );
        console.log(userPreferredLocationRestaurantData);

        const fakeRestaurantData = await Promise.all(
            recommendedFakeRestaurants.map(async (id: any) => {
                const restaurant = await db.fakeRestaurant.findUnique({
                    where: { restaurantId: id },
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
