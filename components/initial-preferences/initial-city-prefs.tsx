"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import CityLocationCategories from "../CityLocationCategories";
import { useUserLocation } from "@/hooks/useUserLocation";

export const InitialCityLocatedPrefs = () => {
    const { city } = useUserLocation();
    const { preferences } = useUserPreferences();
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/ambiencepreferences");
    };
    const handlePrevOnClick = () => {
        router.back();
    };

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Where are you interested in <span className="text-green-600">dining?</span>{" "}
                </h1>

                <CityLocationCategories />

                <p className="text-xs text-center font-light">
                    Explore a curated selection of popular{" "}
                    <span className="text-green-600"> cities</span> people travel to, we will
                    recommend you the best restaurants at your current location, as well as the
                    cities you select. Feel free to choose multiple destinations that pique your
                    interest.
                </p>
                {preferences.preferredLocations!.length > 0 && (
                    <div>
                        <h2 className="text-md text-center font-semibold">Selected Cities</h2>
                        <ul className="text-sm text-center">
                            {preferences.preferredLocations!.map((city, index) => (
                                <Badge
                                    key={index}
                                    className="m-2 cursor-default">
                                    <li key={index}>{city}</li>
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
                        className={`${buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}${
                            preferences.preferredLocations!.length === 0
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
