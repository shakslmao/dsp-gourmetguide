"use client";

import { HiMiniPaintBrush } from "react-icons/hi2";
import { RiPlantFill } from "react-icons/ri";
import { GiModernCity, GiCook } from "react-icons/gi";
import { FaLandmark, FaTree, FaUmbrellaBeach, FaWater } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbHeartShare, TbBuildingSkyscraper } from "react-icons/tb";
import {
    MdLunchDining,
    MdFamilyRestroom,
    MdDoNotDisturbOff,
    MdSportsBar,
    MdOutdoorGrill,
    MdOutlinePets,
} from "react-icons/md";
import { IoIosRestaurant } from "react-icons/io";
import { BsPersonHearts } from "react-icons/bs";
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
import Icons from "./Icons";

// Labels and descriptions for different cuisine categories
export const ambienceCategories = [
    {
        label: "Casual",
        icon: MdLunchDining,
        description: "A relaxed and informal atmosphere for everyday dining.",
    },
    {
        label: "Fine Dining",
        icon: IoIosRestaurant,
        description: "Elegant settings with gourmet cuisine for a high-end dining experience.",
    },
    {
        label: "Family-Friendly",
        icon: MdFamilyRestroom,
        description:
            "Welcoming to families with children, offering a comfortable dining environment.",
    },
    {
        label: "Romantic",
        icon: BsPersonHearts,
        description: "Cozy and intimate, perfect for dates and special occasions.",
    },
    {
        label: "Trendy/Chic",
        icon: TbHeartShare,
        description: "Fashionable and stylish, with a modern vibe and a young crowd.",
    },
    {
        label: "Quiet/Intimate",
        icon: MdDoNotDisturbOff,
        description: "Reserved and serene, ideal for private conversations and peaceful meals.",
    },
    {
        label: "Lively/Bustling",
        icon: FaPeopleGroup,
        description: "Energetic and vibrant, often with music or entertainment.",
    },
    {
        label: "Historic/Classic",
        icon: FaLandmark,
        description: "Rich in history with classic décor, offering a timeless dining experience.",
    },
    {
        label: "Modern/Contemporary",
        icon: GiModernCity,
        description: "Sleek and contemporary, with innovative designs and modern cuisine.",
    },
    {
        label: "Rustic/Country",
        icon: FaTree,
        description: "A cozy, country vibe with traditional comfort foods and a warm atmosphere.",
    },
    {
        label: "Seaside/Beachfront",
        icon: FaUmbrellaBeach,
        description: "Relaxed dining with sea views, often featuring seafood and breezy terraces.",
    },
    {
        label: "Rooftop/Garden",
        icon: RiPlantFill,
        description: "Outdoor or semi-outdoor spaces with panoramic views or lush gardens.",
    },
    {
        label: "Artistic/Bohemian",
        icon: HiMiniPaintBrush,
        description: "Unique and creative spaces filled with art and an eclectic atmosphere.",
    },
    {
        label: "Sports-Themed",
        icon: MdSportsBar,
        description: "Decorated with sports memorabilia and often showing live sports events.",
    },
    {
        label: "Outdoor Dining",
        icon: MdOutdoorGrill,
        description: "Enjoy meals in the open air, from patios to garden settings.",
    },
    {
        label: "Waterfront Dining",
        icon: FaWater,
        description: "Dining by the water, offering picturesque views and a tranquil setting.",
    },
    {
        label: "Panoramic View",
        icon: TbBuildingSkyscraper,
        description:
            "Restaurants with high vantage points for breathtaking city or landscape views.",
    },
    {
        label: "Chef’s Table",
        icon: GiCook,
        description:
            "An exclusive dining experience near the kitchen for a closer look at the culinary process.",
    },
    {
        label: "Pet-Friendly",
        icon: MdOutlinePets,
        description: "Welcomes pets, often with outdoor seating options.",
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
            title: `You've ${isSelected ? "Unselected" : "Selected"} ${toastItem.label}`,
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
                                        <Icons icon={item.icon} />
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
