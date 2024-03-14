import axios from "axios";
import fs from "fs";
import path from "path";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { PriceRange } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        latitude,
        longitude,
        priceRangePreference = PriceRange.NO_PREFERENCE,
        cuisineTypes = "",
    } = req.query;

    const preferences: UserCuisinePreferences = {
        priceRangePreference: priceRangePreference as PriceRange,
        cuisineTypes: typeof cuisineTypes === "string" ? cuisineTypes.split(",") : [],
    };

    const priceMap = {
        [PriceRange.NO_PREFERENCE]: "",
        [PriceRange.VERY_LOW]: "1",
        [PriceRange.LOW]: "2",
        [PriceRange.MEDIUM]: "3",
        [PriceRange.HIGH]: "4",
        [PriceRange.VERY_HIGH]: "4",
    };

    const params = new URLSearchParams({
        term: "restaurants",
        latitude: latitude!.toString(),
        longitude: longitude!.toString(),
        limit: "10",
        categories: preferences.cuisineTypes.join(","),
        price: priceMap[preferences.priceRangePreference] || "",
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
