"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState = ({
    title = "No Restaurants Found",
    subtitle = "There are not any restaurants for this cuisine at the moment...",
    showReset,
}: EmptyState) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-lg text-gray-900">{subtitle}</p>
            {showReset && (
                <Button
                    onClick={() => router.push("/")}
                    className="text-green-600 font-semibold hover:underline">
                    Back
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
