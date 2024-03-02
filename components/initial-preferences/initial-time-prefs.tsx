"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import TimeRangePreferences from "../TimeRangePreferences";

export const InitialTimePrefs = () => {
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/citylocationpreferences");
    };
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/pricepreferences");
    };
    const { preferences } = useUserPreferences();
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Tell us when is your ideal <span className="text-green-600">dining</span> time.
                </h1>
                <TimeRangePreferences />
                <p className="text-xs text-center font-light">
                    Please select the times that best suits you, we will try find restaurants that
                    align with these times, you can change this at any time. Any time is
                    recommended.
                </p>
                {preferences.preferredTime.length > 0 && (
                    <div>
                        <h2 className="text-md text-center font-semibold">Selected Times</h2>
                        <ul className="text-sm text-center">
                            {preferences.preferredTime.map((time, index) => (
                                <Badge
                                    key={index}
                                    className="m-2 cursor-default">
                                    <li key={index}>{time}</li>
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
                        disabled={preferences.preferredTime.length === 0}
                        className={`${buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}${
                            preferences.preferredTime.length === 0
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
