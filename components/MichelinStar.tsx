"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Checkbox } from "./ui/checkbox";

const MichelinStar = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    return (
        <div className="">
            <Checkbox id="agree" />
            <div className="grid gap-1.5 leading-none text-center">
                <label
                    htmlFor="agree"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Yes
                </label>
                <p className="text-xs text-muted-foreground">
                    I would like to be recommended michelin star rated restaurants.
                </p>
            </div>
        </div>
    );
};

export default MichelinStar;
