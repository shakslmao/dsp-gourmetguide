"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";

interface LocationContextProps {
    city: string | null;
    error: string | null;
    permission: "granted" | "denied" | "prompt";
    requestLocationPermission: () => void;
}

export const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const { city, error, permission, requestLocationPermission } = useUserLocation();

    const [locationData, setLocationData] = useState<LocationContextProps>({
        city,
        error,
        permission,
        requestLocationPermission,
    });

    useEffect(() => {
        // Check if update is necessary to avoid unnecessary state updates
        if (
            city !== locationData.city ||
            error !== locationData.error ||
            permission !== locationData.permission
        ) {
            setLocationData({ city, error, permission, requestLocationPermission });
        }
    }, [city, error, permission, requestLocationPermission, locationData]);

    return <LocationContext.Provider value={locationData}>{children}</LocationContext.Provider>;
};
