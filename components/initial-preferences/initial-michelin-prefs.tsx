"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";

export const InitialMichelinPrefs = () => {
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("");
    };
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/radiuspreferences");
    };
    const { preferences } = useUserPreferences();
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Would you like to be recommended
                    <span className="text-green-600"> michelin star</span> rated restaurants.
                </h1>

                <p className="text-xs text-center font-light">
                    Please choose if you would like to see restaurants that have been awarded
                    <span className="text-green-600">michelin</span> stars, this will help us match
                    you with the restaurants that fit your preferences.
                </p>

                <div className="flex justify-evenly gap-x-4">
                    <Button
                        onClick={() => handlePrevOnClick()}
                        className={buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}>
                        Previous
                    </Button>
                    <Button
                        onClick={() => handleNextOnClick()}
                        className={buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
