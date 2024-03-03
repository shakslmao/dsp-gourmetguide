import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Slider } from "./ui/slider";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useCallback, useEffect, useState } from "react";

const RadiusPreference = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const { city } = useUserLocation();
    const [sliderValue, setSliderValue] = useState<number>(
        preferences.recommendationRadius[0] || 0
    );
    useEffect(() => {
        setSliderValue(preferences.recommendationRadius[0] || 0);
    }, [preferences.recommendationRadius]);

    const handleValueChange = useCallback(
        (value: number) => {
            const updatedRadiusPref = [value, preferences.recommendationRadius[1] || value];
            setSliderValue(value);
            updatePreferences({ recommendationRadius: updatedRadiusPref });
        },
        [preferences.recommendationRadius, updatePreferences]
    );

    return (
        <div>
            <div className="text-center mb-4">
                <h2 className="text-sm text-center">Selected Price Range</h2>
                <h3 className="text-2xl font-semibold text-green-600">{sliderValue}</h3>
                <p className="text-xs text-center font-light">
                    Adjust the slider to set the maximum distance you&apos;re willing to travel for
                    dining. This setting applies to your current location and any selected cities.
                </p>
            </div>
            <Slider
                value={sliderValue}
                onValueChange={(value: number) => handleValueChange(value)}
                defaultValue={preferences.recommendationRadius[0] || 0}
                max={20}
                step={1}
            />
        </div>
    );
};
export default RadiusPreference;
