import { db } from "@/db/prismadb";

// Return a user by their Email
export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (err) {
        return null;
    }
};

// Return a user by their ID
export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch (err) {
        return null;
    }
};
