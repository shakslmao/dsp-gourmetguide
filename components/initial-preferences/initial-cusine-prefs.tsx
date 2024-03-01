"use client";

import CuisineCategories from "../CusineCategories";
import { Button, buttonVariants } from "../ui/button";
import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

export const InitialCusinePrefs = () => {
    const { preferences } = useUserPreferences();
    const router = useRouter();
    console.log(preferences);
    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Choose your <span className="text-green-600">favourite</span> cuisines.
                </h1>
                <CuisineCategories />
                <p className="text-xs text-center font-light">
                    Please click on the card to select your cuisine preferences, you may choose as
                    many as you like
                </p>

                {/* display selected prefs */}
                {preferences.cuisineTypes.length > 0 && (
                    <div>
                        <h2 className="text-md  text-center font-semibold"> Selected Cuisines</h2>
                        <ul className="text-sm text-center">
                            {preferences.cuisineTypes.map((cuisine, index) => (
                                <Badge
                                    key={index}
                                    className="m-2 cursor-default">
                                    <li key={index}>{cuisine}</li>
                                </Badge>
                            ))}
                        </ul>
                    </div>
                )}

                <Button
                    onClick={() => router.push("/initial-preferences/dietrypreferences")}
                    className={buttonVariants({
                        variant: "default",
                        className: "w-full py-2 text-white bg-black rounded-lg",
                        size: "sm",
                    })}>
                    Next
                </Button>
            </div>
        </div>
    );
};
