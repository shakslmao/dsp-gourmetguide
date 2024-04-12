import { db } from "@/db/prismadb";

// Return a user by their Email
export const fetchUserEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email }, include: { preferences: true } });
        return user;
    } catch (err) {
        return null;
    }
};

// Return a user by their ID
export const fetchUserId = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id }, include: { preferences: true } });
        return user;
    } catch (err) {
        return null;
    }
};

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
                RecommendationResultRestaurant: {
                    include: {
                        restaurant: true,
                    },
                },
                RecommendationResultOutsideProxRestaurant: {
                    include: {
                        restaurant: true,
                    },
                },
            },
        });

        if (!recommendationResult) {
            return null;
        }

        const fakeRestaurants = recommendationResult.RecommendationResultFakeRestaurant.map(
            (restaurant) => restaurant.fakeRestaurant
        );

        const restaurants = recommendationResult.RecommendationResultRestaurant.map(
            (restaurant) => restaurant.restaurant
        );

        const outsideProxRestaurant =
            recommendationResult.RecommendationResultOutsideProxRestaurant.map(
                (restaurant) => restaurant.restaurant
            );

        console.log("Fake restaurants:", fakeRestaurants);
        console.log("Restaurants:", restaurants);
        console.log("Outside prox restaurants:", outsideProxRestaurant);

        return { fakeRestaurants, restaurants, outsideProxRestaurant };
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
};
