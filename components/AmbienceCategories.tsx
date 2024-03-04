"use client";

import countries from "world-countries";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import FlagAvatar from "./FlagAvatar";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { useUserLocation } from "@/hooks/useUserLocation";

// Labels and descriptions for different cuisine categories
export const ambienceCategories = [
    {
        label: "Casual",
        icon: "",
        description: "A relaxed and informal atmosphere for everyday dining.",
    },
    {
        label: "Fine Dining",
        icon: "",
        description: "Elegant settings with gourmet cuisine for a high-end dining experience.",
    },
    {
        label: "Family-Friendly",
        icon: "",
        description:
            "Welcoming to families with children, offering a comfortable dining environment.",
    },
    {
        label: "Romantic",
        icon: "",
        description: "Cozy and intimate, perfect for dates and special occasions.",
    },
    {
        label: "Trendy/Chic",
        icon: "",
        description: "Fashionable and stylish, with a modern vibe and a young crowd.",
    },
    {
        label: "Quiet/Intimate",
        icon: "",
        description: "Reserved and serene, ideal for private conversations and peaceful meals.",
    },
    {
        label: "Lively/Bustling",
        icon: "",
        description: "Energetic and vibrant, often with music or entertainment.",
    },
    {
        label: "Historic/Classic",
        icon: "",
        description: "Rich in history with classic décor, offering a timeless dining experience.",
    },
    {
        label: "Modern/Contemporary",
        icon: "",
        description: "Sleek and contemporary, with innovative designs and modern cuisine.",
    },
    {
        label: "Rustic/Country",
        icon: "",
        description: "A cozy, country vibe with traditional comfort foods and a warm atmosphere.",
    },
    {
        label: "Seaside/Beachfront",
        icon: "",
        description: "Relaxed dining with sea views, often featuring seafood and breezy terraces.",
    },
    {
        label: "Rooftop/Garden",
        icon: "",
        description: "Outdoor or semi-outdoor spaces with panoramic views or lush gardens.",
    },
    {
        label: "Artistic/Bohemian",
        icon: "",
        description: "Unique and creative spaces filled with art and an eclectic atmosphere.",
    },
    {
        label: "Sports-Themed",
        icon: "",
        description: "Decorated with sports memorabilia and often showing live sports events.",
    },
    {
        label: "Outdoor Dining",
        icon: "",
        description: "Enjoy meals in the open air, from patios to garden settings.",
    },
    {
        label: "Waterfront Dining",
        icon: "",
        description: "Dining by the water, offering picturesque views and a tranquil setting.",
    },
    {
        label: "Panoramic View",
        icon: "",
        description:
            "Restaurants with high vantage points for breathtaking city or landscape views.",
    },
    {
        label: "Chef’s Table",
        icon: "",
        description:
            "An exclusive dining experience near the kitchen for a closer look at the culinary process.",
    },
    {
        label: "Interactive Dining",
        icon: "",
        description:
            "Dining experiences where guests can engage with the cooking process or enjoy performances.",
    },
    {
        label: "Pet-Friendly",
        icon: "",
        description: "Welcomes pets, often with outdoor seating options.",
    },
    {
        label: "Sustainability-Focused",
        icon: "",
        description: "Emphasises eco-friendly practices and locally sourced ingredients.",
    },
];

const AmbienceCategories = () => {
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

    const handleCardClick = (index: number) => {
        const ambienceLabel = ambienceCategories[index].label;
        const isSelected = preferences.ambienceTypes.includes(ambienceLabel);
        const UserAmbienceTypes = isSelected
            ? preferences.ambienceTypes.filter((ambience) => ambience !== ambienceLabel)
            : [...preferences.ambienceTypes, ambienceLabel];
        updatePreferences({
            ambienceTypes: UserAmbienceTypes,
        });

        const toastItem = ambienceCategories[index];
        toast({
            title: `You've ${isSelected ? "Unselected" : "Selected"} ${toastItem.label} ${
                toastItem.icon
            }`,
            description: toastItem.description,
        });
    };

    return (
        <div>
            <Carousel
                opts={{ align: "start" }}
                setApi={setApi}
                className="w-full max-w-sm text-center">
                <CarouselContent>
                    {ambienceCategories.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-2/2 lg:basis-3/3">
                            <div className="p-1">
                                <Card
                                    className={`cursor-pointer ${
                                        preferences.ambienceTypes.includes(item.label)
                                            ? "bg-green-600 text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() => {
                                        handleCardClick(index);
                                    }}>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 mx-6">
                                        <FlagAvatar src={item.icon} />
                                        <h3 className="text-3xl font-semibold mb-4">
                                            {item.label}
                                        </h3>
                                        <p className="text-sm text-center font-light">
                                            {item.description}
                                        </p>
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
                Cuisine {current} of {count}
            </div>
        </div>
    );
};

export default AmbienceCategories;
