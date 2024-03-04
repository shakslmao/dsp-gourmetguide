import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Slider } from "./ui/slider";
import { useUserLocation } from "@/hooks/useUserLocation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";

const RadiusPreference = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const { city } = useUserLocation();
    const [sliderValue, setSliderValue] = useState<number>(preferences.recommendationRadius);
    useEffect(() => {
        setSliderValue(preferences.recommendationRadius);
    }, [preferences.recommendationRadius]);

    const handleValueChange = useCallback(
        async (value: number) => {
            setSliderValue(value);
            try {
                updatePreferences({
                    recommendationRadius: value,
                    currentLocation: city ? city : undefined,
                });
            } catch (error) {
                toast({
                    title: "Error Updating Preference",
                    description: "There was an issue saving your preferences. Please try again.",
                });
            }
        },
        [updatePreferences, city]
    );

    return (
        <div>
            <div className="text-center mb-4">
                <h2 className="text-sm text-center">Selected Radius</h2>
                <h3 className="text-2xl font-semibold text-green-600">{sliderValue} miles</h3>
                <p className="text-xs text-center font-light">
                    Adjust the slider to set the maximum distance you&apos;re willing to travel for
                    dining. This setting applies to your current location and any selected cities.
                </p>
            </div>
            <Slider
                value={[sliderValue]}
                onValueChange={(value: number[]) => handleValueChange(value[0])}
                defaultValue={[preferences.recommendationRadius || 0]}
                max={20}
                step={1}
            />
        </div>
    );
};
export default RadiusPreference;
