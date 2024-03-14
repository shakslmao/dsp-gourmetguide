import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fetchYelpData from "@/pages/api/yelp";
import { describe, it, expect } from "@jest/globals";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
require("dotenv").config();

describe("fetchYelpData", () => {
    it("Fetches data Successfuly from YELP API", async () => {
        const mock = new MockAdapter(axios);
        const data = { business: [{ name: "Restaurant" }] };

        const latitude = 51.4545;
        const longitude = 2.5879;

        const userPreferences: UserCuisinePreferences = {
            cuisineTypes: ["British"],
            dietaryRestrictions: [],
            priceRangePreference: "MEDIUM",
            preferredTime: [],
            preferredLocations: [],
            currentLocation: null,
            recommendationRadius: 0,
            prefersMichelinRated: false,
            ambienceTypes: [],
            accessibilityFeatures: false,
        };

        mock.onGet("https://api.yelp.com/v3/businesses/search", {
            params: {
                term: "restaurants",
                latitude: "51.4545",
                longitude: "2.5879",
                limit: "50",
                categories: "British",
                price: "3",
            },
        }).reply(200, data);

        const result = await fetchYelpData(latitude, longitude, userPreferences);

        expect(result).toEqual(data);
    });
});
