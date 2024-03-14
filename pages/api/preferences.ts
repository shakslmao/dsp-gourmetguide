"use server";

import { db } from "@/db/prismadb";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { NextApiRequest, NextApiResponse } from "next";

// GET USER PREFERENCES

// Define the default async handler function for API requests.
export default async function handler(
    req: NextApiRequest, // The incoming HTTP request.
    res: NextApiResponse<UserCuisinePreferences | { error: string }> // The outgoing HTTP response.
) {
    // Handle GET requests to fetch user preferences.
    if (req.method === "GET") {
        // Extract the user ID from the query parameters.
        const id = req.query.id as string;

        // If no ID is provided, return a 400 Bad Request error.
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        try {
            // Attempt to fetch the user and their preferences from the database.
            const user = await db.user.findUnique({
                where: { id }, // Specify the user ID condition.
                include: { preferences: true }, // Include user preferences in the response.
            });

            // If the user exists and has preferences, respond with the preferences.
            if (user && user.preferences) {
                res.status(200).json(user.preferences);
            } else {
                // If the user or their preferences were not found, respond with a 404 Not Found error.
                res.status(404).json({ error: "User not found" });
            }
        } catch (err) {
            // If an error occurs during database access, return a 500 Internal Server Error.
            res.status(500).json({ error: "Failed to fetch user preferences" });
        }
    }
    // Handle POST requests to update user preferences.
    else if (req.method === "POST") {
        // Extract userId and preferences from the request body.
        const { userId, preferences } = req.body;

        // If either userId or preferences are missing, return a 400 Bad Request error.
        if (!userId || !preferences) {
            return res.status(400).json({ error: "User ID and preferences are required" });
        }

        try {
            // Attempt to update the user's preferences, creating a new record if one doesn't exist.
            await db.preferences.upsert({
                where: { userId }, // Specify the user ID condition.
                update: {
                    ...preferences, // Update existing preferences.
                },
                create: {
                    ...preferences, // Or create new preferences if they don't exist.
                    userId,
                },
            });

            // Respond with the updated/created preferences.
            res.status(200).json({ ...preferences });
        } catch (err) {
            // If an error occurs during the update/create process, return a 500 Internal Server Error.
            res.status(500).json({ error: "Failed to update user preferences" });
        }
    }
    // If the request method is neither GET nor POST, return a 405 Method Not Allowed error.
    else {
        // Inform the client which methods are allowed.
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
