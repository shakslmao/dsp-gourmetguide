"use client";

import { ActionType, RecommendationResultRestaurant, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import FavouriteButton from "../FavouriteButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface RecommendationOutsideProxCardProps {
    id: string;
    imageUrl: string;
    restaurantName: string;
    price: number;
    categories: string[];
    reviewCount: number;
    customerRatings: number;
    location: string;
}

const RecommendationOutsideProxCard = ({
    id,
    restaurantName,
    price,
    reviewCount,
    customerRatings,
}: RecommendationOutsideProxCardProps) => {
    const router = useRouter();
    return (
        <div>
            <Card className="min-w-[200px]">
                <CardHeader>
                    <CardTitle className="text-sm">{restaurantName}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">Reviews: {reviewCount}</CardContent>
                <CardContent className="text-sm">Rating: {customerRatings}</CardContent>
                <CardContent className="text-sm">Price Level: {price}</CardContent>
            </Card>
        </div>
    );
};

export default RecommendationOutsideProxCard;
