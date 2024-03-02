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

interface TimeRange {
    label: string;
    timeRange: string;
    recommended?: string;
}

const timeRangeCategories = {
    AnyTime: [
        {
            label: "Anytime",
            timeRange: "Choosing Anytime includes all available dining hours.",
            recommended: "This choice is recommended for the most flexibility.",
        },
    ],
    Breakfast: [
        { label: "Early Morning", timeRange: "6:00 AM - 7:00 AM" },
        { label: "Mid Morning", timeRange: "8:00 AM - 9:00 AM" },
        { label: "Late Morning", timeRange: "10:00 AM - 11:00 AM" },
    ],
    Lunch: [
        { label: "Early Lunch", timeRange: "11:00 AM - 12:00 PM" },
        { label: "Midday", timeRange: "12:00 PM - 1:00 PM" },
        { label: "Late Lunch", timeRange: "1:00 PM - 2:00 PM" },
    ],
    Dinner: [
        { label: "Early Dinner", timeRange: "5:00 PM - 6:00 PM" },
        { label: "Prime Dining", timeRange: "7:00 PM - 8:00 PM" },
        { label: "Late Dinner", timeRange: "9:00 PM - 10:00 PM" },
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

    const handleCardClick = (selectedTimeRange: string) => {
        const currentPreferences = preferences.preferredTime;
        let updatedPreferences;

        if (currentPreferences.includes(selectedTimeRange)) {
            updatedPreferences = currentPreferences.filter((time) => time !== selectedTimeRange);
        } else {
            updatedPreferences = [...currentPreferences, selectedTimeRange];
        }

        updatePreferences({ preferredTime: updatedPreferences });
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
                                        <p className="text-sm text-center font-light">
                                            {item.timeRange}
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
