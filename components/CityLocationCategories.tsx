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
        description: "I'm only interested in restaurants around my current location.",
    },
    {
        label: "London",
        flag: "",
        description:
            "Explore a cosmopolitan culinary scene, from traditional British pubs to Michelin-starred dining.",
    },
    {
        label: "Edinburgh",
        flag: "",
        description: "Savor Scottish specialties like haggis and whisky, amidst historic settings.",
    },
    {
        label: "Manchester",
        flag: "",
        description:
            "A vibrant food scene with a mix of traditional British fare and international cuisine.",
    },
    {
        label: "Birmingham",
        flag: "",
        description: "Known for its diverse culinary scene, including the famous Balti Triangle.",
    },
    {
        label: "Liverpool",
        flag: "",
        description:
            "Enjoy waterfront dining with dishes ranging from British classics to international flavors.",
    },
    {
        label: "Glasgow",
        flag: "",
        description:
            "Discover a dynamic food scene with innovative restaurants and traditional Scottish dishes.",
    },
    {
        label: "Bristol City",
        flag: "",
        description:
            "A foodie's delight with a focus on sustainable and locally sourced ingredients.",
    },
    {
        label: "Oxford",
        flag: "",
        description:
            "Classic British cuisine meets international flavors in this historic university city.",
    },
    {
        label: "Cambridge",
        flag: "",
        description:
            "Indulge in a mix of traditional British eateries and contemporary dining experiences.",
    },
    {
        label: "Brighton",
        flag: "",
        description:
            "A seaside culinary adventure with fresh seafood and vibrant vegetarian options.",
    },
    {
        label: "Bath",
        flag: "",
        description: "Enjoy Georgian elegance with afternoon teas, gastropubs, and fine dining.",
    },
    {
        label: "Newcastle upon Tyne",
        flag: "",
        description:
            "Experience a lively food scene with hearty British meals and international cuisine.",
    },
    {
        label: "Leeds",
        flag: "",
        description:
            "A bustling city with a thriving street food scene and diverse culinary offerings.",
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

    const handleCardClick = async (index: number) => {
        try {
            const cityLabel = cityCategories[index].label;
            const isSelected = preferences.preferredLocations.includes(cityLabel);
            const UserCuisineTypes = isSelected
                ? preferences.preferredLocations.filter((city) => city !== cityLabel)
                : [...preferences.preferredLocations, cityLabel];
            await updatePreferences({
                preferredLocations: UserCuisineTypes,
                currentLocation: city ?? undefined,
            });

            const toastItem = cityCategories[index];
            toast({
                title: `You've ${isSelected ? "Unselected" : "Selected"} ${toastItem.label} ${
                    toastItem.flag
                }`,
                description: "Your Preferences Have Been Saved!",
            });
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
                {/* if the card is === to the users city, dont display that card. */}
                <CarouselContent>
                    {cityCategories.map((item, index) => {
                        if (item.label === city) {
                            return null;
                        }
                        return (
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
                        );
                    })}
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
