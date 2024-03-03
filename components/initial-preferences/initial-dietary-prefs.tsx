"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import DietaryCategories from "../DietaryCategories";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";

export const InitialDietaryPrefs = () => {
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
                <DietaryCategories />
                <p className="text-xs text-center font-light">
                    Please click on the card that best describes your dietary preferences, if you
                    have any.
                </p>

                {preferences.dietaryRestrictions.length > 0 && (
                    <div>
                        <h2 className="text-md text-center font-semibold">
                            Selected Dietary Preferences
                        </h2>
                        <ul className="text-sm text-center">
                            {preferences.dietaryRestrictions.map((dietary, index) => (
                                <Badge
                                    key={index}
                                    className="m-2 cursor-default">
                                    <li key={index}>{dietary}</li>
                                </Badge>
                            ))}
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
                        disabled={preferences.dietaryRestrictions.length === 0}
                        className={`${buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })} ${
                            preferences.dietaryRestrictions.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600"
                        }
                        
                        `}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
