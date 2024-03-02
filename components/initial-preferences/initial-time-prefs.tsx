"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import PriceRangePreferences from "../PriceRangePreferences";
import TimeRangePreferences from "../TimeRangePreferences";

export const InitialTimePrefs = () => {
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("");
    };
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/pricepreferences");
    };
    const { preferences, updatePreferences } = useUserPreferences();
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Tell us when is your ideal <span className="text-green-600">dining</span> time.
                </h1>
                <TimeRangePreferences />
                <p className="text-xs text-center font-light">
                    Please drag the slider to your preferred dining time, this will help us match
                    you with the restaurants that fit your preferences, you can change this at any
                    time.
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
