export interface Cuisine {
    label: string;
    flag: string;
    description: string;
}

export interface Dietary {
    label: string;
    description: string;
}

export interface Ambience {
    label: string;
    description: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface OpeningHours {
    [day: string]: string;
}

export interface FakeRestaurantProps {
    id: string;
    restaurantId: string;
    restaurantName: string;
    cuisine: Cuisine[];
    dietary: Dietary[];
    priceRange: string;
    rating: number;
    reviewCount: number;
    ambience: Ambience[];
    accessibility: string;
    location: string;
    coordinates: Coordinates;
    openingHours: OpeningHours;
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

export interface RecommendationState {
    RecommendationResultRestaurant: RestaurantProps[];
    RecommendationResultOutsideProxRestaurant: RestaurantProps[];
    RecommendationResultFakeRestaurant: FakeRestaurantProps[];
}

export interface RecommendationContextType extends RecommendationState {
    updateRecommendations: (newRecommendations: Partial<RecommendationState>) => void;
}

export function isValidRecommendationContextType(data: any): data is RecommendationState {
    return (
        data &&
        data.RecommendationResultRestaurant &&
        data.RecommendationResultOutsideProxRestaurant &&
        data.RecommendationResultFakeRestaurant
    );
}
