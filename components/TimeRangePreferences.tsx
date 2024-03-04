import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import FlagAvatar from "./FlagAvatar";
import { toast } from "./ui/use-toast";

interface TimeRange {
    label: string;
    timeRange: string;
    description?: string;
    recommended?: string;
}

const timeRangeCategories = {
    AnyTime: [
        {
            label: "Any time",
            timeRange: "Choosing any time includes all available dining hours.",
            recommended: "This choice is recommended for the most flexibility.",
            description: "Perfect for spontaneous foodies - dine whenever you desire.",
        },
    ],
    Breakfast: [
        {
            label: "Early Morning",
            timeRange: "6:00 AM - 7:00 AM",
            description: "Catch the first light with fresh brews and pastries.",
        },
        {
            label: "Mid Morning",
            timeRange: "8:00 AM - 9:00 AM",
            description: "Ideal for late risers craving the full breakfast experience.",
        },
        {
            label: "Late Morning",
            timeRange: "10:00 AM - 11:00 AM",
            description: "Brunch enthusiasts unite for a blend of breakfast and lunch.",
        },
    ],
    Lunch: [
        {
            label: "Early Lunch",
            timeRange: "11:00 AM - 12:00 PM",
            description: "Beat the rush with an early taste of the lunch menu.",
        },
        {
            label: "Midday",
            timeRange: "12:00 PM - 1:00 PM",
            description: "Join the lunch crowd for a classic midday refuel.",
        },
        {
            label: "Late Lunch",
            timeRange: "1:00 PM - 2:00 PM",
            description: "For those who lunch at their leisure, away from the crowds.",
        },
    ],
    Dinner: [
        {
            label: "Early Dinner",
            timeRange: "5:00 PM - 6:00 PM",
            description: "Dine early with sunset views and the first pick of the night.",
        },
        {
            label: "Prime Dining",
            timeRange: "7:00 PM - 8:00 PM",
            description: "Experience peak dining with prime slots for culinary adventures.",
        },
        {
            label: "Late Dinner",
            timeRange: "9:00 PM - 10:00 PM",
            description: "Night owls and late shifters, this time's for you.",
        },
    ],
};

// Correctly flatten the object into an array for mapping
// Assuming timeRangeCategories structure remains the same
const allTimeRanges: TimeRange[] = Object.values(timeRangeCategories).flat();

const TimeRangePreferences = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleCardClick = async (selectedTimeRangeLabel: string) => {
        try {
            const currentPreferences = preferences.preferredTime;
            let updatedPreferences;
            let action; // To track whether a selection or deselection has occurred

            if (currentPreferences.includes(selectedTimeRangeLabel)) {
                updatedPreferences = currentPreferences.filter(
                    (label) => label !== selectedTimeRangeLabel
                );
                action = "deselected";
            } else {
                updatedPreferences = [...currentPreferences, selectedTimeRangeLabel];
                action = "selected";
            }

            // Find the selected time range object from allTimeRanges
            const selectedTimeRange = allTimeRanges.find(
                (item) => item.label === selectedTimeRangeLabel
            );

            if (selectedTimeRange) {
                const toastMessage =
                    action === "selected"
                        ? `You have selected ${selectedTimeRange.label} (${selectedTimeRange.timeRange}) as your preferred time.`
                        : `You have deselected ${selectedTimeRange.label}. It will no longer be considered as your preferred dining time.`;

                toast({
                    title: action === "selected" ? "Preference Saved" : "Preference Removed",
                    description: toastMessage,
                });
            }

            await updatePreferences({ preferredTime: updatedPreferences });
        } catch (error) {
            toast({
                title: "Error Updating Preference",
                description: "There was an issue saving your preferences. Please try again.",
            });
        }
    };

    return (
        <div>
            <Carousel
                opts={{ align: "start" }}
                setApi={setApi}
                className="w-full max-w-sm">
                <CarouselContent>
                    {allTimeRanges.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-2/2 lg:basis-3/3">
                            <div className="p-1">
                                <Card
                                    className={`cursor-pointer ${
                                        preferences.preferredTime.includes(item.label)
                                            ? "bg-green-600 text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() => {
                                        handleCardClick(item.label);
                                    }}>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 mx-6">
                                        <h3 className="text-3xl font-semibold mb-4">
                                            {item.label}
                                        </h3>
                                        <p className="text-sm text-center  font-semibold">
                                            {item.timeRange}
                                        </p>
                                        <p className="mt-3 text-sm text-center font-light">
                                            {item.description}
                                        </p>
                                        {item.recommended && (
                                            <p className="mt-6 text-xs text-center font-light italic">
                                                {item.recommended}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="py-1 text-center text-xs text-muted-foreground">
                Dietary {current} of {count}
            </div>
        </div>
    );
};

export default TimeRangePreferences;
