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
import RecommendationFakeCard from "@/components/recommendations/RecommendationFakeCard";
import RecommendationOutsideProxCard from "@/components/recommendations/RecommendationCardOutsideProx";

const DashboardPage = () => {
    const { currentUser, userPreferences, userRecommendations } = useCurrentUser() || {};
    const isEmpty = true;
    if (isEmpty) {
        <EmptyState showReset />;
    }
    return (
        <div>
            <Container>
                <div className="mt-80">
                    <h1 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Welcome, <span className="text-green-600">{currentUser?.name} </span>!
                    </h1>
                    <p className="mt-4 text-lg max-w-prose text-muted-foreground text-gray-900">
                        Here are some restaurant recommendations based on your preferences
                    </p>
                </div>

                {/* Fake Restaurants */}
                <div>
                    <Container>
                        <div className="flex items-center justify-center mb-10">
                            <div className="pt-80 overflow-x-scroll scrollbar-hide">
                                <div className="flex space-x-4">
                                    {userRecommendations?.RecommendationResultFakeRestaurant?.map(
                                        (rec) => (
                                            <RecommendationFakeCard
                                                key={rec.id}
                                                id={rec.id}
                                                restaurantName={rec.restaurantName}
                                                priceRange={rec.priceRange}
                                                rating={rec.rating}
                                                reviewCount={rec.reviewCount}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

                {/* Real Restaurants */}
                <div>
                    <Container>
                        <div className="flex items-center justify-center mb-10">
                            <div className="overflow-x-scroll scrollbar-hide">
                                <div className="flex space-x-4">
                                    {userRecommendations?.RecommendationResultRestaurant?.map(
                                        (rec) => (
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
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

                {/* Real Restaurants Outside Prox */}
                <div>
                    <Container>
                        <div className="flex items-center justify-center mb-10">
                            <div className="pt-6 overflow-x-scroll scrollbar-hide">
                                <div className="flex space-x-4">
                                    {userRecommendations?.RecommendationResultOutsideProxRestaurant?.map(
                                        (rec) => (
                                            <RecommendationOutsideProxCard
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
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </Container>
        </div>
    );
};

export default DashboardPage;
