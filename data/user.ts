import { db } from "@/db/prismadb";

// Return a user by their Email
export const fetchUserEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email }, include: { preferences: true } });
        return user;
    } catch (err) {
        return null;
    }
};

// Return a user by their ID
export const fetchUserId = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({ where: { id }, include: { preferences: true } });
        return user;
    } catch (err) {
        return null;
    }
};

export const fetchUserRec = async (id: string | undefined) => {
    try {
        const rec = await db.recommendationResult.findUnique({
            where: { id },
        });
        return rec;
    } catch (e) {
        return null;
    }
};
