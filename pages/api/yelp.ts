import axios from "axios";
import fs from "fs";
import path from "path";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { PriceRange } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

function convertPriceRange(priceRange: PriceRange) {
    switch (priceRange) {
        case PriceRange.NO_PREFERENCE:
            return "1,2,3,4";
        case PriceRange.VERY_LOW:
            return "1";
        case PriceRange.LOW:
            return "2";
        case PriceRange.MEDIUM:
            return "3";
        case PriceRange.HIGH:
        case PriceRange.VERY_HIGH:
            return "4";
        default:
            return "1,2,3,4";
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const preferences = req.body.preferences as UserCuisinePreferences;
    const categories = preferences.cuisineTypes.join(",");
    const price = convertPriceRange(preferences.priceRangePreference);
    const params = new URLSearchParams({
        term: "restaurants",
        location: preferences.currentLocation || "Bristol", // Default to Bristol if no location is provided
        radius: preferences.recommendationRadius
            ? String(preferences.recommendationRadius * 1000)
            : "30000",
        categories: categories,
        price: price,
        limit: "10",
    });

    try {
        const response = await axios.get("https://api.yelp.com/v3/businesses/search", {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API_KEY}`,
                "Content-Type": "application/json",
            },
            params,
        });
        const filePath = path.join(process.cwd(), "data", "yelp_response.json");
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 4));
        console.log(JSON.stringify(response.data, null, 4));
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching data from Yelp." });
    }
}
