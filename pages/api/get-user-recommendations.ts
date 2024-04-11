"use server";

import { db } from "@/db/prismadb";

export const fetchUserRecommendations = async (userId: string | undefined) => {
    console.log("Fetching recommendations for user:", userId);
    if (!userId) {
        return null; // or throw an error depending on your error handling strategy
    }

    try {
        const recommendationResult = await db.recommendationResult.findUnique({
            where: { userId },
            include: {
                RecommendationResultFakeRestaurant: {
                    include: {
                        fakeRestaurant: true,
                    },
                },
            },
        });
        console.log("Recommendation result:", recommendationResult);

        if (!recommendationResult) {
            return null;
        }

        const fakeRestaurants = recommendationResult.RecommendationResultFakeRestaurant.map(
            (restaurant) => restaurant.fakeRestaurant
        );
        console.log("Fake restaurants:", fakeRestaurants);

        return { fakeRestaurants };
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
};
