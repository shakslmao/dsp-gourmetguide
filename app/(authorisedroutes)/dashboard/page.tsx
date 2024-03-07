"use client";
import { useCurrentUser } from "@/hooks/get-user-prefs";
import { Loader } from "lucide-react";

const DashboardPage = () => {
    const { currentUser, userPreferences } = useCurrentUser() || {};

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Hello {currentUser?.name} <br />
                    <span className="text-green-600">Here is what we think you may like</span>.
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground text-gray-900"></p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        {userPreferences ? (
                            JSON.stringify(userPreferences)
                        ) : (
                            <p>Loading user preferences...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
