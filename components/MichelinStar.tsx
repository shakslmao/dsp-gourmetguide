import { useState, useEffect, FormEvent } from "react";
import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const MichelinStar = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const [selectedValue, setSelectedValue] = useState(
        preferences.prefersMichelinRated ? "yes" : "no"
    );

    useEffect(() => {
        setSelectedValue(preferences.prefersMichelinRated ? "yes" : "no");
    }, [preferences.prefersMichelinRated]);

    const handleChange = (newValue: string) => {
        // Ensure newValue is typed as string
        const prefersMichelinRated = newValue === "yes";
        setSelectedValue(newValue); // Update local state
        updatePreferences({ ...preferences, prefersMichelinRated }); // Update global state
    };

    return (
        <RadioGroup
            value={selectedValue}
            onChange={(newValue: FormEvent<HTMLDivElement>) =>
                handleChange((newValue.currentTarget as HTMLInputElement).value)
            }>
            <div className="flex justify-center items-center gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="yes"
                        id="yes"
                    />
                    <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        value="no"
                        id="no"
                    />
                    <Label htmlFor="no">No</Label>
                </div>
            </div>
        </RadioGroup>
    );
};

export default MichelinStar;
