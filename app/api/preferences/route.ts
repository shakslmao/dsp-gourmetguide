import { db } from "@/db/prismadb";
import { UserCuisinePreferences } from "@/types/UserPreferencesTypes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserCuisinePreferences | { error: string }>
) {
    if (req.method === "GET") {
        const email = req.query.email as string;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        try {
            const user = await db.user.findUnique({
                where: { email },
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
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
