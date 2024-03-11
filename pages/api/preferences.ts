"use server";

import { db } from "@/db/prismadb";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserCuisinePreferences | { error: string }>
) {
    if (req.method === "GET") {
        const id = req.query.id as string;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        try {
            const user = await db.user.findUnique({
                where: { id },
                include: { preferences: true },
            });

            if (user && user.preferences) {
                res.status(200).json(user.preferences);
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ error: "Failed to fetch user preferences" });
        }
    } else if (req.method === "POST") {
        const { userId, preferences } = req.body;

        if (!userId || !preferences) {
            return res.status(400).json({ error: "User ID and preferences are required" });
        }

        try {
            await db.preferences.upsert({
                where: { userId },
                update: {
                    ...preferences,
                },
                create: {
                    ...preferences,
                    userId,
                },
            });

            res.status(200).json({ ...preferences });
        } catch (err) {
            res.status(500).json({ error: "Failed to update user preferences" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
