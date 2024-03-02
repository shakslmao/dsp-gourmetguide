"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Slider } from "./ui/slider";
import { useCallback, useEffect, useState } from "react";
import { PriceRange } from "@prisma/client";

type PriceRangeMapping = {
    [key: number]: string;
};

const priceRangeToSliderValue = {
    NONE_SET: 0,
    VERY_LOW: 20,
    LOW: 40,
    MEDIUM: 60,
    HIGH: 80,
    VERY_HIGH: 100,
};

const sliderValueToPriceRange: PriceRangeMapping = {
    0: "No Preference",
    20: "Very Low Price",
    40: "Low Price ",
    60: "Medium Price",
    80: "High Price",
    100: "Very High Price",
};

const sliderValueDescription: PriceRangeMapping = {
    0: "You will be shown restaurants of all price ranges.",
    20: "£0 - 25, you're looking for a budget meal",
    40: "£25 - £50, you're looking for a mid-range meal.",
    60: "£50 - £75, you're looking for a high-end meal.",
    80: "£75 - £100, you're looking for a luxury meal.",
    100: "£100+, you're looking for a very luxury meal.",
};

const PriceRangePreferences = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const [sliderValue, setSliderValue] = useState<number>(
        priceRangeToSliderValue[preferences.priceRangePreference]
    );
    const selectedPriceRangeLabel = sliderValueToPriceRange[sliderValue];
    const selectedPriceRangeDescription = sliderValueDescription[sliderValue];

    const handleValueChange = useCallback(
        (value: number[]) => {
            const newSliderValue = value[0];
            setSliderValue(newSliderValue);
            const newPriceRange = sliderValueToPriceRange[newSliderValue];
            if (newPriceRange) {
                updatePreferences({ priceRangePreference: newPriceRange as PriceRange });
            }
        },
        [updatePreferences]
    );
    console.log(preferences);

    return (
        <div>
            <div className="text-center mb-4">
                <h2 className="text-md text-center">Selected Price Range</h2>
                <h3 className="text-2xl font-semibold text-green-600">{selectedPriceRangeLabel}</h3>
                <p className="text-xs text-center font-light">{selectedPriceRangeDescription}</p>
            </div>
            <Slider
                value={[sliderValue]}
                onValueChange={handleValueChange}
                defaultValue={[0]}
                max={100}
                step={20}
            />
        </div>
    );
};

export default PriceRangePreferences;
