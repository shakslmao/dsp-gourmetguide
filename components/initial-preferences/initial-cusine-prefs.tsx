"use client";

import CuisineCategories from "../CusineCategories";
import { Button, buttonVariants } from "../ui/button";
import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { CuisinePrefsValidationSchema } from "@/schemas";
import { toast } from "../ui/use-toast";
import { Progress } from "../ui/progress";

export const InitialCusinePrefs = () => {
    const { preferences } = useUserPreferences();
    const router = useRouter();
    const handleOnClick = () => {
        const result = CuisinePrefsValidationSchema.safeParse({
            selectedCuisines: preferences.cuisineTypes,
        });

        if (result.success) {
            router.push("/inital-preferences/dietarypreferences");
        } else {
            toast({
                title: "Error",
                description: result.error.message,
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Choose your <span className="text-green-600">favourite</span> cuisines.
                </h1>
                <CuisineCategories />
                <p className="text-xs text-center font-light">
                    Please click on the card to select your{" "}
                    <span className="text-green-600"> cuisine</span> preferences, you may choose as
                    many as you like
                </p>

                {/* display selected prefs */}
                {preferences.cuisineTypes.length > 0 && (
                    <div>
                        <h2 className="text-md  text-center font-semibold">
                            Selected Cuisine Preferences
                        </h2>
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
                    onClick={() => handleOnClick()}
                    disabled={preferences.cuisineTypes.length === 0}
                    className={`${buttonVariants({
                        variant: "default",
                        className: "w-full py-2 text-white bg-black rounded-lg",
                        size: "sm",
                    })} ${
                        preferences.cuisineTypes.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600"
                    }`}>
                    Next
                </Button>
            </div>
        </div>
    );
};
