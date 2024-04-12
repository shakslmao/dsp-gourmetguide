"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { RecommendationContextType, RecommendationState } from "@/types/RecommendationTypes";

const defaultRecommendations: RecommendationState = {
    RecommendationResultFakeRestaurant: [],
    RecommendationResultRestaurant: [],
    RecommendationResultOutsideProxRestaurant: [],
};

const RecommendationsContext = createContext<RecommendationContextType | undefined>(undefined);

export const useUserRecommendations = (): RecommendationContextType => {
    const context = useContext(RecommendationsContext);
    if (context === undefined) {
        throw new Error("useUserRecommendations must be used within a UserRecommendationsProvider");
    }
    return context;
};

export const UserRecommendationsProvider = ({ children }: { children: ReactNode }) => {
    const [recommendations, setRecommendations] =
        useState<RecommendationState>(defaultRecommendations);

    const updateRecommendations = async (
        newRecommendations: Partial<RecommendationContextType>
    ) => {
        setRecommendations((prevRecommendations) => ({
            ...prevRecommendations,
            ...newRecommendations,
        }));
    };

    return (
        <RecommendationsContext.Provider value={{ ...recommendations, updateRecommendations }}>
            {children}
        </RecommendationsContext.Provider>
    );
};
