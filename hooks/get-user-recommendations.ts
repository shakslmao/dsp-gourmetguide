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
            recommendedUserLocationRestaurants.map(async (restaurantId: any) => {
                const restaurant = await db.restaurant.findUnique({
                    where: { yelpId: restaurantId },
                });
                return restaurant;
            })
        );

        const userPreferredLocationRestaurantData = await Promise.all(
            recommendedUserPreferredLocationRestaurants.map(async (restaurantId: any) => {
                const restaurant = await db.restaurant.findUnique({
                    where: { yelpId: restaurantId },
                });
                return restaurant;
            })
        );

        const fakeRestaurantData = await Promise.all(
            recommendedFakeRestaurants.map(async (restaurantId: any) => {
                const restaurant = await db.fakeRestaurant.findUnique({
                    where: { restaurantId: restaurantId },
                });
                return restaurant;
            })
        );

        return {
            recommendedUserLocationRestaurants: userLocationRestaurantData,
            recommendedUserPreferredLocationRestaurants: userPreferredLocationRestaurantData,
            recommendedFakeRestaurants: fakeRestaurantData,
        };
    } catch (err) {
        return null;
    }
};
