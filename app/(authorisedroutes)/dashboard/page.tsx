"use client";

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
import { useCurrentUser } from "@/hooks/get-user-data";
import Categories from "@/components/navbar/Categories";
import { Container } from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import RecommendationWithinProxCard from "@/components/recommendations/RecommendationCard";

const DashboardPage = () => {
    const { currentUser, userPreferences, userRecommendations } = useCurrentUser() || {};
    const isEmpty = true;
    if (isEmpty) {
        <EmptyState showReset />;
    }
    return (
        <div>
            {/* Fake Restaurants */}
            <div>
                <Container>
                    <div className="pt-60 overflow-x-auto">
                        <div className="flex space-x-4">
                            {userRecommendations?.RecommendationResultRestaurant?.map((rec) => (
                                <RecommendationWithinProxCard
                                    key={rec.id}
                                    id={rec.id}
                                    location={rec.locationId ?? ""}
                                    price={rec.price}
                                    imageUrl={rec.imageUrl}
                                    restaurantName={rec.restaurantName}
                                    categories={rec.categories}
                                    reviewCount={rec.reviewCount}
                                    customerRatings={rec.customerRatings}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            {/* Real Restaurants */}
            <div>
                <Container>
                    <div className="pt-60 overflow-x-auto">
                        <div className="flex space-x-4">
                            {userRecommendations?.RecommendationResultRestaurant?.map((rec) => (
                                <RecommendationWithinProxCard
                                    key={rec.id}
                                    id={rec.id}
                                    location={rec.locationId ?? ""}
                                    price={rec.price}
                                    imageUrl={rec.imageUrl}
                                    restaurantName={rec.restaurantName}
                                    categories={rec.categories}
                                    reviewCount={rec.reviewCount}
                                    customerRatings={rec.customerRatings}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default DashboardPage;
