"use client";

import { ActionType, RecommendationResultRestaurant, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import FavouriteButton from "../FavouriteButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface RecommendationFakeCardProps {
    id: string;
    restaurantName: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
}

const RecommendationFakeCard = ({
    id,
    restaurantName,
    priceRange,
    rating,
    reviewCount,
}: RecommendationFakeCardProps) => {
    const router = useRouter();
    return (
        <div>
            <Card className="min-w-[200px]">
                <CardHeader>
                    <CardTitle className="text-sm">{restaurantName}</CardTitle>
                    <CardDescription className="text-sm">{}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">Reviews: {reviewCount}</CardContent>
                <CardContent className="text-sm">Rating: {rating}</CardContent>
                <CardContent className="text-sm">Price Level: {priceRange}</CardContent>
            </Card>
        </div>
    );
};

export default RecommendationFakeCard;
