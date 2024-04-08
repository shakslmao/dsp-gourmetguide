interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface FakeRestaurantProps {
    id: string;
    restaurantId: string;
    restaurantName: string;
    cuisines: string[];
    dietary: string[];
    priceRange: string;
    rating: number;
    reviewCount: number;
    ambience: string[];
    accessibility: string;
    location: string;
    coordinates: Coordinates;
    openingHours: string[] | string;
}

export interface RestaurantProps {
    id: string;
    yelpId?: string;
    alias?: string;
    restaurantName?: string;
    imageUrl?: string;
    url?: string;
    isClosed?: boolean;
    categories: string[];
    reviewCount?: number;
    coordinates?: Coordinates;
    price?: number;
    phone?: string;
    displayPhone?: string;
    customerRatings?: number;
    locationId?: string;
    reviewsId?: string;
    ratingsId?: string;
}

export interface RecommendationContextType {
    recommendedUserLocationRestaurants: RestaurantProps[];
    recommendedUserPreferredLocationRestaurants: RestaurantProps[];
    recommendedFakeRestaurants: FakeRestaurantProps[];
}

export function isValidRecommendationContextType(data: any): data is RecommendationContextType {
    return (
        data &&
        data.recommendedUserLocationRestaurants &&
        data.recommendedUserPreferredLocationRestaurants &&
        data.recommendedFakeRestaurants
    );
}
