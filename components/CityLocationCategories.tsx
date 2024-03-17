"use client";

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
import Modal from "./Modal/modal";

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
        label: "Bath",
        flag: "",
        description: "Enjoy Georgian elegance with afternoon teas, gastropubs, and fine dining.",
    },
];

const CityLocationCategories = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const { city, permission, requestLocationPermission } = useUserLocation();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

    const handleLocationPermissionAllow = async () => {
        await requestLocationPermission();
        setLocationPermissionGranted(true); // Update state to show permission sgranted.
        setShowLocationModal(false); // Close the modal
    };

    // Handler for when user denies location access
    const handleLocationPermissionDenied = () => {
        setLocationPermissionGranted(false);
        setShowLocationModal(false); // Close the modal
        toast({
            title: "Location permission denied",
            description: "You can change your location preferences in the settings.",
        });
    };

    useEffect(() => {
        if (permission === "prompt") {
            setShowLocationModal(true);
        }
    }, [permission]);

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

        if (cityLabel === cityCategories[0].label && !locationPermissionGranted) {
            setLocationPermissionGranted(false);
            toast({
                title: "Location Needed for Current Location",
                description: "Please allow location permission to use this feature.",
            });
            return;
        }

        const isSelected = preferences.preferredLocations?.includes(cityLabel) ?? false;
        const UserCuisineTypes = isSelected
            ? preferences.preferredLocations?.filter((city) => city !== cityLabel) ?? []
            : [...(preferences.preferredLocations ?? []), cityLabel];
        updatePreferences({
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
    };

    return (
        <div>
            {showLocationModal && (
                <Modal
                    isOpen={showLocationModal}
                    onClose={handleLocationPermissionDenied}
                    onSubmit={handleLocationPermissionAllow}
                    title="Share Your Location ?"
                    body={
                        <p>
                            We will like to use your current location to enhance your experience by
                            showing you restaurants and cuisines nearby. Your location will not be
                            used for any other purposes. You can choose to deny this request and
                            manually select your preferred city from the list.{" "}
                        </p>
                    }
                    actionLabel="Allow"
                    secondaryAction={handleLocationPermissionDenied}
                    secondaryActionLabel="Deny"
                />
            )}

            <Carousel
                opts={{ align: "start" }}
                setApi={setApi}
                className="w-full max-w-sm">
                {/* if the card is === to the users city, dont display that card. */}
                <CarouselContent>
                    {cityCategories.map((item, index) => {
                        // Logic to skip rendering the current location card if it matches the user's city
                        if (item.label === city) {
                            return null;
                        }
                        const isCurrentLocationCard = item.label === "My Current Location";
                        const isDisabled = isCurrentLocationCard && !locationPermissionGranted;
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
                                        } ${
                                            isDisabled
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            if (!isDisabled) {
                                                handleCardClick(index);
                                            } else {
                                                toast({
                                                    title: "Location Permission Needed",
                                                    description:
                                                        "Please allow location permission to use this feature.",
                                                });
                                            }
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
                                                {isCurrentLocationCard && city ? `${city}` : ""}
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
