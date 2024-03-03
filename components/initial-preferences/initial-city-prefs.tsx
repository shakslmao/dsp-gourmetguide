"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

export const InitialCityLocatedPrefs = () => {
    const { preferences } = useUserPreferences();
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/pricepreferences");
    };
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/cuisinepreferences");
    };
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    What are your <span className="text-green-600">dietary</span> preferences.
                </h1>

                <p className="text-xs text-center font-light">
                    Please click on the card that best describes your dietary preferences, if you
                    have any.
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
