"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import AmbienceCategories from "../AmbienceCategories";

export const InitialAmbiencePrefs = () => {
    const { preferences } = useUserPreferences();
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/accessibilitypreferences");
    };
    const handlePrevOnClick = () => {
        router.back();
    };
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    What are your <span className="text-green-600">ambience</span> preferences.
                </h1>
                <AmbienceCategories />

                <p className="text-xs text-center font-light">
                    Please click on the card that best describes your
                    <span className="text-green-600"> ambience</span> preferences, if you have any.
                </p>

                {preferences.ambienceTypes.length > 0 && (
                    <div>
                        <h2 className="text-md text-center font-semibold">
                            Selected Ambience Preferences
                        </h2>
                        <ul className="text-sm text-center">
                            {preferences.ambienceTypes.map((ambience, index) => (
                                <Badge
                                    key={index}
                                    className="m-2 cursor-default">
                                    <li key={index}>{ambience}</li>
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
                        disabled={preferences.ambienceTypes.length === 0}
                        className={`${buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })} ${
                            preferences.ambienceTypes.length === 0
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
