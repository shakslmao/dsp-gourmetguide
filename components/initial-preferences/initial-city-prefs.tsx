"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import CityLocatedPreferences from "@/app/inital-preferences/citylocationpreferences/page";
import CityLocationCategories from "../CityLocationCategories";
import { useUserLocation } from "@/hooks/useUserLocation";

export const InitialCityLocatedPrefs = () => {
    const { preferences } = useUserPreferences();
    const { city, error } = useUserLocation();
    console.log(city, error);

    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("");
    };
    const handlePrevOnClick = () => {
        router.push("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                {error && (
                    <div className="text-center">
                        <p>Failed to get city name {error}</p>
                    </div>
                )}
                <h1 className="text-2xl font-bold text-center">
                    Beyond your current location {city}, which{" "}
                    <span className="text-green-600">cities</span> are on your dining wishlist?
                </h1>

                <p className="text-xs text-center font-light">
                    Explore a curated selection of <span className="text-green-600"> cities</span>,
                    distinct from your current location, where dining opportunities await your
                    discovery. Feel free to choose multiple destinations that pique your interest.
                </p>
                <CityLocationCategories />

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
