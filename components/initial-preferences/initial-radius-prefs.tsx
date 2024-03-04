"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import RadiusPreference from "../RadiusPreferences";

export const InitialRadiusPrefs = () => {
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/ambiencepreferences");
    };
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/citylocationpreferences");
    };
    const { preferences } = useUserPreferences();
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    How far are you willing to <span className="text-green-600">travel</span> for a
                    meal?
                </h1>

                <RadiusPreference />
                <p className="text-xs text-center font-light">
                    Set your preferred <span className="text-green-600">distance radius</span> to
                    find restaurants. Slide to select the maximum distance you are comfortable
                    traveling. This helps us tailor restaurant suggestions that are conveniently
                    located. You can adjust this setting anytime to explore further or keep it
                    close.
                </p>
                {preferences.recommendationRadius > 0 && (
                    <div>
                        <ul className="text-sm text-center">
                            <Badge>{preferences.recommendationRadius} Miles</Badge>
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
