"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { toast } from "./ui/use-toast";
import FlagAvatar from "./FlagAvatar";
import { useEffect, useState } from "react";

export const dietaryCategories = [
    {
        label: "None",
        icon: "",
        description: "I dont have any restrictions or preferences.",
    },
    {
        label: "Vegetarian",
        icon: "",
        description: "Excludes meat and fish, but may include dairy products and eggs.",
    },
    {
        label: "Vegan",
        icon: "",
        description: "Excludes all animal products, including dairy, eggs, and often honey.",
    },
    {
        label: "Pescatarian",
        icon: "",
        description: "Excludes meat except for fish and seafood, may include dairy and eggs.",
    },
    {
        label: "Gluten Free",
        icon: "",
        description: "Avoids gluten-containing grains such as wheat, barley, and rye.",
    },
    {
        label: "Halal",
        icon: "",
        description: "Adheres to Islamic dietary laws, including specific methods of slaughter.",
    },
    {
        label: "Kosher",
        icon: "",
        description:
            "Follows Jewish dietary laws, including restrictions on how food is prepared and consumed.",
    },
    {
        label: "Plant Based",
        icon: "",
        description:
            "Primarily focuses on foods derived from plants, including vegetables, grains, nuts, and fruits, with minimal or no animal products.",
    },
    {
        label: "Paleo",
        icon: "",
        description:
            "Based on the presumed diet of Paleolithic humans, focusing on whole foods like meat, fish, fruits, vegetables, nuts, and seeds while avoiding processed foods, grains, and dairy.",
    },
    {
        label: "Nut Free",
        icon: "",
        description:
            "Caters to individuals with nut allergies, excluding all forms of tree nuts and peanuts from the diet",
    },

    {
        label: "Dairy Free",
        icon: "",
        description:
            "Suitable for lactose intolerant individuals or those avoiding dairy for ethical or health reasons, excluding all dairy products.",
    },
];

const DietaryCategories = () => {
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
        const dietaryLabel = dietaryCategories[index].label;
        const isSelected = preferences.dietaryRestrictions.includes(dietaryLabel);
        const UserDietaryTypes = isSelected
            ? preferences.dietaryRestrictions.filter((dietary) => dietary !== dietaryLabel)
            : [...preferences.dietaryRestrictions, dietaryLabel];
        updatePreferences({ dietaryRestrictions: UserDietaryTypes });

        const toastItem = dietaryCategories[index];
        toast({
            title: `You've ${isSelected ? "Unselected" : "Selected"} ${
                toastItem.label
            } preference ${toastItem.icon}`,
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
                    {dietaryCategories.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-2/2 lg:basis-3/3">
                            <div className="p-1">
                                <Card
                                    className={`cursor-pointer ${
                                        preferences.dietaryRestrictions.includes(item.label)
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
                Dietary {current} of {count}
            </div>
        </div>
    );
};

export default DietaryCategories;
