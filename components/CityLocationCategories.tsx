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
export const cityCategories = [
    {
        label: "My Current Location",
        flag: "",
        description: "Im only interested in restaurants around my current location",
    },
    {
        label: "London",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Edingburgh",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Manchester",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Birmingham",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Liverpool",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Glasgow",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Bristol",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Oxford",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Cambdrige",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Brighton",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Bath",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Newcastle upon Tyne",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
    {
        label: "Leeds",
        flag: countries.find((country) => country.name.common === "United Kingdom")?.flag,
        description: "",
    },
];

const CityLocationCategories = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const { city, error } = useUserLocation();
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
        const cityLabel = cityCategories[index].label;
        const isSelected = preferences.preferredLocations.includes(cityLabel);
        const UserCuisineTypes = isSelected
            ? preferences.preferredLocations.filter((city) => city !== cityLabel)
            : [...preferences.preferredLocations, cityLabel];
        updatePreferences({ preferredLocations: UserCuisineTypes });

        const toastItem = cityCategories[index];
        toast({
            title: `You've ${isSelected ? "Unselected" : "Selected"} ${toastItem.label} Cuisine ${
                toastItem.flag
            }`,
            description: "Your Preferences Have Been Saved!",
        });
    };

    return (
        <div>
            <Carousel
                opts={{ align: "start" }}
                setApi={setApi}
                className="w-full max-w-sm">
                <CarouselContent>
                    {cityCategories.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-2/2 lg:basis-3/3 text-center">
                            <div className="p-1">
                                <Card
                                    className={`cursor-pointer ${
                                        preferences.preferredLocations?.includes(item.label)
                                            ? "bg-green-600 text-white"
                                            : "bg-white"
                                    }`}
                                    onClick={() => {
                                        handleCardClick(index);
                                    }}>
                                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6 mx-6">
                                        <FlagAvatar src={item.flag} />
                                        <h3 className="text-3xl font-semibold mb-4">
                                            {item.label}
                                        </h3>
                                        <p className="text-sm text-center font-light">
                                            {item.description}
                                        </p>
                                        <p className="mt-4 text-sm text-center font-light">
                                            {index === 0 && city ? `${city}` : ""}
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

export default CityLocationCategories;
