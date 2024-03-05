"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Slider } from "./ui/slider";
import { useCallback, useEffect, useState } from "react";
import { PriceRange } from "@prisma/client";
import { toast } from "./ui/use-toast";

type PriceRangeMapping = {
    [key: number]: string;
};

const priceRangeToSliderValue = {
    NO_PREFERENCE: 0,
    VERY_LOW: 20,
    LOW: 40,
    MEDIUM: 60,
    HIGH: 80,
    VERY_HIGH: 100,
};

const sliderValueToPriceRange: PriceRangeMapping = {
    0: "No Preference",
    20: "Very Low Prices",
    40: "Low Prices ",
    60: "Medium Prices",
    80: "High Prices",
    100: "Very High Prices",
};

const sliderValueDescription: PriceRangeMapping = {
    0: "You'll be shown restaurants of all price ranges, from the most affordable to the most exclusive dining options.",
    20: "£0 - £25: Ideal for those who prefer dining at more affordable restaurants without compromising on quality.",
    40: "£25 - £50: A range suited for enjoying meals at restaurants with moderate pricing, offering good value.",
    60: "£50 - £75: Reflects a preference for dining at higher-end restaurants, where the experience and quality are prioritised.",
    80: "£75 - £100: Caters to those who indulge in very high-end dining experiences, where the ambiance and culinary excellence are unmatched.",
    100: "£100+: For the ultimate in luxury dining, where no expense is spared for exceptional food, service, and atmosphere.",
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
            // Mark function as async
            const newSliderValue = value[0];
            setSliderValue(newSliderValue);
            const newPriceRange = sliderValueToPriceRange[newSliderValue];

            updatePreferences({ priceRangePreference: newPriceRange as PriceRange });
        },
        [updatePreferences] // Dependency array
    );

    return (
        <div>
            <div className="text-center mb-4">
                <h2 className="text-sm text-center">Selected Price Range</h2>
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
