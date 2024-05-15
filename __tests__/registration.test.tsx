import bcrypt from "bcryptjs";
import { db } from "../db/prismadb";
import { register } from "../actions/register";
import { PriceRange } from "@prisma/client";
import PriceRangePreferences from "@/components/PriceRangePreferences";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { YelpAPIWithPrefs } from "@/lib/yelpAPIPrefs";

jest.mock;
jest.mock("bcryptjs");
jest.mock("@/lib/tokens");
jest.mock("@/lib/mail");
jest.mock("../db/prismadb", () => ({
    db: {
        user: {
            findUnique: jest.fn().mockImplementation(({ where }) => {
                if (where.email === "text@example.com") {
                    return Promise.resolve({ email: "test@example.com" });
                }
                return Promise.resolve(null);
            }),
            create: jest.fn(),
            update: jest.fn(),
        },
        preferences: { create: jest.fn() },
    },
}));

describe("register", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (db.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
            if (where.email === "test@example.com") {
                return Promise.resolve(null);
            }
            return Promise.resolve({ id: 1, email: where.email });
        });
        (db.user.create as jest.Mock).mockResolvedValue({ id: 1, preferencesId: null });
        (db.user.update as jest.Mock).mockResolvedValue({});
    });

    it("should return error if fields are not valid", async () => {
        const data = { email: "invalid", password: "123", name: "", confirmPassword: "123" };
        const result = await register(data);
        expect(result).toEqual({ error: "Fields are not valid" });
    });

    it("should return error if user already exists", async () => {
        (db.user.findUnique as jest.Mock).mockResolvedValueOnce({
            id: 1,
            email: "test@example.com",
        });

        const data = {
            email: "test@example.com",
            password: "Password123!",
            name: "John Doe",
            confirmPassword: "Password123!",
        };

        const result = await register(data);
        expect(result).toEqual({ error: "User already exists" });
    });

    it("should create a user with preferences", async () => {
        const mockPreferences: UserCuisinePreferences = {
            cuisineTypes: ["Italian"],
            priceRangePreference: PriceRange.LOW || undefined,
            preferredLocations: [""],
            currentLocation: "",
            recommendationRadius: 10,
            locationFeatureUsed: false,
        };

        const mockUser = { id: 1, preferencesId: 1 };
        const mockPreferencesResult = { id: 1 };

        (db.user.create as jest.Mock).mockResolvedValueOnce(mockUser);
        (db.preferences.create as jest.Mock).mockResolvedValueOnce(mockPreferencesResult);

        const data = {
            email: "test@example.com",
            password: "Password123!",
            name: "John Doe",
            confirmPassword: "Password123!",
            preferences: mockPreferences,
        };

        const result = await register(data);

        expect(db.preferences.create).toHaveBeenCalledWith({
            data: {
                ...mockPreferences,
                priceRangePreference: PriceRange.LOW,
                userId: mockUser.id,
            },
        });
        expect(db.user.create).toHaveBeenCalledWith({
            data: {
                name: "John Doe",
                email: "test@example.com",
                password: expect.any(String),
            },
        });
        expect(db.user.update).toHaveBeenCalledWith({
            where: { id: mockUser.id },
            data: { preferencesId: mockPreferencesResult.id },
        });
        expect(result).toEqual({ success: "User created successfully", user: mockUser });
    });

    it("should call the Yelp API with user preferences", async () => {
        const mockPreferences: UserCuisinePreferences = {
            cuisineTypes: ["Italian"],
            priceRangePreference: PriceRange.LOW || undefined,
            preferredLocations: ["Bristol"],
            currentLocation: "Bristol",
            recommendationRadius: 10,
            locationFeatureUsed: false,
        };
        

        const mockUser = { id: 1, preferencesId: 1 };
        const mockPreferencesResult = { id: 1 };
        const mockYelpResponse = {
            businesses: [
                {
                    id: "1",
                    name: "Restaurant A",
                },
                {
                    id: "2",
                    name: "Restaurant B",
                },
            ],
        };

        (db.user.create as jest.Mock).mockResolvedValueOnce(mockUser);
        (db.preferences.create as jest.Mock).mockResolvedValueOnce(mockPreferencesResult);
        (YelpAPIWithPrefs as jest.Mock).mockResolvedValueOnce(mockYelpResponse);

        const data = {
            email: "test@example.com",
            password: "Password123!",
            name: "John Doe",
            confirmPassword: "Password123!",
            preferences: mockPreferences,
        };

        await register(data);

        expect(YelpAPIWithPrefs).toHaveBeenCalledWith(mockPreferences);
        expect(fetch).not.toHaveBeenCalled();
    });

    it("should call the Flask API with user data", async () => {
        const mockPreferences: UserCuisinePreferences = {
            cuisineTypes: ["Italian"],
            priceRangePreference: PriceRange.LOW || undefined,
            preferredLocations: ["Bristol"],
            currentLocation: "Bristol",
            recommendationRadius: 10,
            locationFeatureUsed: false,
        };

        const mockUser = { id: 1, preferencesId: 1 };
        const mockPreferencesResult = { id: 1 };
        const mockYelpResponse = {
            businesses: [
                {
                    id: "1",
                    name: "Restaurant A",
                },
                {
                    id: "2",
                    name: "Restaurant B",
                },
            ],
        };

        const mockFlaskResponse = { message: "Success" };
        (db.user.create as jest.Mock).mockResolvedValueOnce(mockUser);
        (db.preferences.create as jest.Mock).mockResolvedValueOnce(mockPreferencesResult);
        (YelpAPIWithPrefs as jest.Mock).mockResolvedValueOnce(mockYelpResponse);
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            headers: {
                get: () => "application/json",
            },
            json: () => Promise.resolve(mockFlaskResponse),
        });

        const data = {
            email: "test@example.com",
            password: "Password123!",
            name: "John Doe",
            confirmPassword: "Password123!",
            preferences: mockPreferences,
        };
        const flaskEndPoint = "http://127.0.0.1:5000/recommendations_for_current_location";

        await register(data);

        expect(fetch).toHaveBeenCalledWith(
            flaskEndPoint,
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: expect.any(String),
            })
        );
    });
    
});

