export interface FakeRestaurantProps {
    id: string;
    restaurantId: string;
    restaurantName: string;
    cuisine: string[];
    dietary: string[];
    priceRange: string;
    rating: number;
    reviewCount: number;
    ambience: string[];
    accessibility: string;
    location: string;
    coordinates: string[];
    openingHours: string[];
}
export interface RestaurantProps {
    id: string;
    yelpId: string;
    alias: string;
    restaurantName: string;
    imageUrl: string;
    url?: string | null;
    isClosed: boolean;
    categories: string[];
    reviewCount: number;
    coordinates: any;
    price: number;
    phone: string;
    displayPhone: string;
    customerRatings: number;
    locationId?: string | null;
    reviewsId?: string | null;
    ratingsId?: string | null;
}

export interface RecommendationContextType {
    RecommendationResultRestaurant: RestaurantProps[];
    RecommendationResultOutsideProxRestaurant: RestaurantProps[];
    RecommendationResultFakeRestaurant: FakeRestaurantProps[];
    updateRecommendations: (newRecommendations: Partial<RecommendationContextType>) => void;
}

export function isValidRecommendationContextType(data: any): data is RecommendationContextType {
    return (
        data &&
        data.RecommendationResultRestaurant &&
        data.RecommendationResultOutsideProxRestaurant &&
        data.RecommendationResultFakeRestaurant
    );
}
