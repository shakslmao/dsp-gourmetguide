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
        label: "Bristol",
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

// Initialises a component to manage city location categories.
const CityLocationCategories = () => {
    // Hooks for managing user preferences and location.
    const { preferences, updatePreferences } = useUserPreferences();
    const { city, permission, requestLocationPermission } = useUserLocation();

    // State management for the Carousel API, current index, count, and modal visibility.
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

    // Function to handle permission being granted for location access.
    const handleLocationPermissionAllow = () => {
        requestLocationPermission(); // Requests location permission from the user.
        setLocationPermissionGranted(true); // Updates state to indicate permission has been granted.
        setShowLocationModal(false); // Closes the modal window.
    };

    // Function to handle the user denying location access.
    const handleLocationPermissionDenied = () => {
        setLocationPermissionGranted(false); // Updates state to indicate permission has not been granted.
        setShowLocationModal(false); // Closes the modal window.
        toast({
            // Displays a message to the user regarding denied location permission.
            title: "Location permission denied",
            description: "You can change your location preferences in the settings.",
        });
    };

    // Effect hook to show location modal based on permission state.
    useEffect(() => {
        if (permission === "prompt") {
            setShowLocationModal(true); // Shows the modal if permission is set to 'prompt'.
        }
    }, [permission]);

    // Effect hook for Carousel API updates.
    useEffect(() => {
        if (!api) {
            // Checks if the API is initialised.
            return;
        }

        setCount(api.scrollSnapList().length); // Sets the count of items.
        setCurrent(api.selectedScrollSnap() + 1); // Updates the current selection.

        api.on("select", () => {
            // Listens for a selection event.
            setCurrent(api.selectedScrollSnap() + 1); // Updates the current selection upon event.
        });
    }, [api]);

    // Handler for card clicks within the component.
    const handleCardClick = (index: number) => {
        // const cityLabel = cityCategories[index].label; // Retrieves the label of the clicked city.
        let cityLabel = cityCategories[index].label;
        if (cityLabel === "My Current Location") {
            if (city) {
                cityLabel = city;
            } else {
                toast({
                    title: "Location Needed for Current Location",
                    description: "Please allow location permission to use this feature.",
                });
                return;
            }
        }

        if (cityLabel === preferences.currentLocation) {
            toast({
                title: "Location Already Selected",
                description: "You have already selected this location.",
            });
            return;
        }

        // Determines if the clicked city is already selected.
        const isSelected = preferences.preferredLocations?.includes(cityLabel) ?? false;
        // Updates the user's preferred locations based on the selection.
        const UserPreferredLocations = isSelected
            ? preferences.preferredLocations?.filter((location) => location !== cityLabel) ?? []
            : [...(preferences.preferredLocations ?? []), cityLabel];
        // Saves the updated preferences.
        updatePreferences({
            preferredLocations: UserPreferredLocations,
            currentLocation: city,
        });

        // Notifies the user of the saved preference change.

        const toastMessage = isSelected ? "removed from" : "added to";
        toast({
            title: `Location ${toastMessage} your preferences`,
            description: `${cityLabel} has been ${toastMessage} your preferred locations.`,
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
                                                    variant: "destructive",
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
                City {current} of {count}
            </div>
        </div>
    );
};

export default CityLocationCategories;
