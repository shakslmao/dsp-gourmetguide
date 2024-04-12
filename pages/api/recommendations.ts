"use server";
import { db } from "@/db/prismadb";
import { RecommendationContextType } from "@/types/RecommendationTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RecommendationContextType | { error: string }>
) {
    if (req.method === "GET") {
        const userId = req.query.userId as string;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        try {
            const user = await db.user.findUnique({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

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

            if (recommendationResult && user) {
                const response: RecommendationContextType = {
                    RecommendationResultFakeRestaurant:
                        recommendationResult.RecommendationResultFakeRestaurant.map((r) => ({
                            id: r.fakeRestaurant.id,
                            restaurantId: r.fakeRestaurant.restaurantId,
                            restaurantName: r.fakeRestaurant.restaurantName,
                            cuisine: r.fakeRestaurant.cuisine,
                            dietary: r.fakeRestaurant.dietary,
                            priceRange: r.fakeRestaurant.priceRange,
                            rating: r.fakeRestaurant.rating,
                            reviewCount: r.fakeRestaurant.reviewCount,
                            ambience: r.fakeRestaurant.ambience,
                            accessibility: r.fakeRestaurant.accessibility,
                            location: r.fakeRestaurant.location,
                            coordinates: r.fakeRestaurant.coordinates,
                            openingHours: r.fakeRestaurant.openingHours,
                        })),

                    RecommendationResultRestaurant:
                        recommendationResult.RecommendationResultRestaurant.map((r) => ({
                            id: r.restaurant.id,
                            yelpId: r.restaurant.yelpId,
                            alias: r.restaurant.alias,
                            restaurantName: r.restaurant.restaurantName,
                            imageUrl: r.restaurant.imageUrl,
                            url: r.restaurant.url,
                            isClosed: r.restaurant.isClosed,
                            categories: r.restaurant.categories,
                            reviewCount: r.restaurant.reviewCount,
                            coordinates: r.restaurant.coordinates,
                            price: r.restaurant.price,
                            phone: r.restaurant.phone,
                            displayPhone: r.restaurant.displayPhone,
                            customerRatings: r.restaurant.customerRatings,
                            locationId: r.restaurant.locationId,
                            reviewsId: r.restaurant.reviewsId,
                            ratingsId: r.restaurant.ratingsId,
                        })),

                    RecommendationResultOutsideProxRestaurant:
                        recommendationResult.RecommendationResultOutsideProxRestaurant.map((r) => ({
                            id: r.restaurant.id,
                            yelpId: r.restaurant.yelpId,
                            alias: r.restaurant.alias,
                            restaurantName: r.restaurant.restaurantName,
                            imageUrl: r.restaurant.imageUrl,
                            url: r.restaurant.url,
                            isClosed: r.restaurant.isClosed,
                            categories: r.restaurant.categories,
                            reviewCount: r.restaurant.reviewCount,
                            coordinates: r.restaurant.coordinates,
                            price: r.restaurant.price,
                            phone: r.restaurant.phone,
                            displayPhone: r.restaurant.displayPhone,
                            customerRatings: r.restaurant.customerRatings,
                            locationId: r.restaurant.locationId,
                            reviewsId: r.restaurant.reviewsId,
                            ratingsId: r.restaurant.ratingsId,
                        })),
                    updateRecommendations: () => {},
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: "Recommendation not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch recommendations" });
        }
    }
}
