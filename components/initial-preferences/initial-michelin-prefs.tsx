"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import MichelinStar from "../MichelinStar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MichelinStarValidationSchema, TMichelinStarOptionValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const InitialMichelinPrefs = () => {
    const { preferences } = useUserPreferences();
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("");
    };
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/radiuspreferences");
    };
    const form = useForm<TMichelinStarOptionValidationSchema>({
        resolver: zodResolver(MichelinStarValidationSchema),
    });

    const onSubmit = (data: TMichelinStarOptionValidationSchema) => {
        toast({
            title: "Preferences Updated",
            description: "Your preferences have been updated successfully.",
        });
    };

    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Would you like to be recommended
                    <span className="text-green-600"> michelin star</span> rated restaurants.
                </h1>
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem className="block text-medium text-center">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex justify-center space-x-10">
                                                {" "}
                                                {/* Ensures horizontal layout and spacing */}
                                                <FormItem className="flex items-center">
                                                    {" "}
                                                    {/* Flex layout for alignment */}
                                                    <FormControl className="flex items-center">
                                                        {" "}
                                                        {/* Ensure the FormControl also aligns items in center */}
                                                        <RadioGroupItem value="all" />
                                                        <FormLabel className="ml-2">
                                                            Yes
                                                        </FormLabel>{" "}
                                                        {/* Margin left for spacing */}
                                                    </FormControl>
                                                </FormItem>
                                                <FormItem className="flex items-center">
                                                    {" "}
                                                    {/* Flex layout for alignment */}
                                                    <FormControl className="flex items-center">
                                                        {" "}
                                                        {/* Ensure the FormControl also aligns items in center */}
                                                        <RadioGroupItem value="none" />
                                                        <FormLabel className="ml-2">
                                                            No
                                                        </FormLabel>{" "}
                                                        {/* Margin left for spacing */}
                                                    </FormControl>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>

                <p className="text-xs text-center font-light">
                    Please choose if you would like to see restaurants that have been awarded
                    <span className="text-green-600"> michelin</span> stars, this will help us match
                    you with the restaurants that fit your preferences.
                </p>

                <div className="flex justify-evenly gap-x-4">
                    <Button
                        onClick={() => handlePrevOnClick()}
                        className={buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}>
                        Previous
                    </Button>
                    <Button
                        onClick={() => handleNextOnClick()}
                        className={buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
