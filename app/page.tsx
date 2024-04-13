"use client";
import WidthCover from "@/components/WidthCover";
import AltLogo from "@/components/navbar/AltLogo";
import { buttonVariants } from "@/components/ui/button";
import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Gourmet Guide <br />
                    <span className="text-green-600">Your Personalised Restaurant Experience</span>.
                </h1>
                <p className="mt-6 text-lg max-w-prose text-muted-foreground text-gray-900">
                    Embark on a bespoke culinary journey with Gourmet Guide, the pioneering
                    restaurant recommendation system designed to cater to your individual tastes and
                    preferences. At the heart of Gourmet Guide lies a sophisticated algorithm that
                    learns from your dining history, preferences, and feedback to craft a curated
                    list of restaurant recommendations tailored just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <Link
                        href="/inital-preferences/cuisinepreferences"
                        className={buttonVariants()}>
                        Get Started Now
                    </Link>
                </div>{" "}
            </div>
        </div>
    );
}
