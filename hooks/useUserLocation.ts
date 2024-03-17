import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface GeocodeResult {
    results: {
        address_components: {
            long_name: string;
            short_name: string;
            types: string[];
        }[];
    }[];
    status: string;
}

// Custom hook name should use "use" prefix
export const useUserLocation = () => {
    const [city, setCity] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permission, setPermission] = useState<"granted" | "denied" | "prompt">("prompt");

    const updatePermissionState = () => {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            setPermission(result.state);
        });
    };

    const requestLocationPermission = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const fetchedCity = await fetchCityName(latitude, longitude);
                        setCity(fetchedCity);
                        updatePermissionState(); // Update permission state after successful location fetch
                    } catch (err) {
                        setError(`Error: ${(err as Error).message}`);
                    }
                },
                (error) => {
                    setError(`Error: ${error.message}`);
                    updatePermissionState(); // Update permission state after failed location fetch
                }
            );
        } else {
            toast({
                title: "Geolocation not supported",
                description: "Your device does not support geolocation",
            });
        }
    };

    useEffect(() => {
        updatePermissionState();
    }, []);

    const fetchCityName = async (latitude: number, longitude: number) => {
        const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`;
        const response = await fetch(url);
        const data: GeocodeResult = await response.json();
        console.log(data);
        if (data.status === "OK" && data.results.length > 0) {
            // First, try to find the locality
            let cityObj = data.results[0].address_components.find((component) =>
                component.types.includes("locality")
            );
            // If not found, look for administrative_area_level_2
            if (!cityObj) {
                cityObj = data.results[0].address_components.find((component) =>
                    component.types.includes("administrative_area_level_2")
                );
            }
            // If still not found, consider administrative_area_level_1
            if (!cityObj) {
                cityObj = data.results[0].address_components.find((component) =>
                    component.types.includes("administrative_area_level_1")
                );
            }
            return cityObj ? cityObj.long_name : "Not Found";
        } else {
            console.error("API response status:", data.status);
            throw new Error("Failed to fetch city name");
        }
    };

    return { city, error, permission, requestLocationPermission }; // Return both city and any potential error for use in your component
};
