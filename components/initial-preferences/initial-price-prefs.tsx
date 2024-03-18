"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import PriceRangePreferences from "../PriceRangePreferences";
import { Progress } from "../ui/progress";

export const InitialPricePrefs = () => {
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/timepreferences");
    };
    const handlePrevOnClick = () => {
        router.back();
    };
    const { preferences } = useUserPreferences();
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <Progress
                    value={30}
                    className="w-full"
                />
                <h1 className="text-2xl font-bold text-center">
                    How much do you like to <span className="text-green-600">spend</span> at
                    restaurants.
                </h1>
                <PriceRangePreferences />
                <p className="text-xs text-center font-light">
                    Please drag the slider to your preferred
                    <span className="text-green-600"> price</span> preference, this will help us
                    match you with the restaurants that fit your budget, you can change this at any
                    time.
                </p>
                {preferences.priceRangePreference && (
                    <div>
                        <ul className="text-sm text-center">
                            <Badge>{preferences.priceRangePreference}</Badge>
                        </ul>
                    </div>
                )}

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
