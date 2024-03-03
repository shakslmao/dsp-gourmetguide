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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const fetchedCity = await fetchCityName(latitude, longitude);
                    setCity(fetchedCity);
                } catch (err) {
                    setError(`Error: ${(err as Error).message}`);
                }
            },
            (error) => {
                setError(`Error: ${error.message}`);
            }
        );
    }, []); // Empty dependency array means this effect runs once on mount

    const fetchCityName = async (latitude: number, longitude: number) => {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        const response = await fetch(url);
        const data: GeocodeResult = await response.json();
        console.log(data);
        if (data.status === "OK") {
            const addressComponents = data.results[0].address_components;
            const cityObj = addressComponents.find((component) =>
                component.types.includes("locality")
            );
            return cityObj ? cityObj.long_name : "Not Found";
        } else {
            console.error("API response status:", data.status);
            throw new Error("Failed to fetch city name");
        }
    };

    return { city, error }; // Return both city and any potential error for use in your component
};
