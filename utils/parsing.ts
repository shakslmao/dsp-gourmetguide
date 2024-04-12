import { Ambience, Cuisine, Dietary } from "@/types/RecommendationTypes";
import { Prisma } from "@prisma/client";

export function parseCuisine(cuisineData: Prisma.JsonValue): Cuisine[] {
    if (!Array.isArray(cuisineData)) return [];

    return cuisineData.map((item): Cuisine => {
        if (typeof item !== "object" || item === null) {
            return { label: "Unknown", flag: "", description: "" };
        }
        const { label = "Unknown", flag = "", description = "" } = item as any;
        return { label, flag, description };
    });
}

export function parseDietary(dietaryData: Prisma.JsonValue): Dietary[] {
    if (!Array.isArray(dietaryData)) return [];

    return dietaryData.map((item): Dietary => {
        if (typeof item !== "object" || item === null) {
            return { label: "Unknown", description: "" };
        }
        const { label = "Unknown", description = "" } = item as any;
        return { label, description };
    });
}

export function parseAmbience(ambienceData: Prisma.JsonValue): Ambience[] {
    if (!Array.isArray(ambienceData)) return [];

    return ambienceData.map((item): Ambience => {
        if (typeof item !== "object" || item === null) {
            return { label: "Unknown", description: "" };
        }
        const { label = "Unknown", description = "" } = item as any;
        return { label, description };
    });
}

export function parseCoordinates(coordinates: Prisma.JsonValue): {
    latitude: number;
    longitude: number;
} {
    if (typeof coordinates !== "object" || coordinates === null) {
        return { latitude: 0, longitude: 0 };
    }
    const { latitude = 0, longitude = 0 } = coordinates as any;
    return { latitude, longitude };
}

export function parseOpeningHours(openingHours: Prisma.JsonValue): {
    [day: string]: string;
} {
    if (typeof openingHours !== "object" || openingHours === null) {
        return {};
    }
    return openingHours as any;
}
