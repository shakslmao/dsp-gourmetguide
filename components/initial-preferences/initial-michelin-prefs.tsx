"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { MichelinStarValidationSchema, TMichelinStarOptionValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const InitialMichelinPrefs = () => {
    const { preferences, updatePreferences } = useUserPreferences();
    const router = useRouter();
    const handlePrevOnClick = () => {
        router.push("/inital-preferences/radiuspreferences");
    };
    const form = useForm<TMichelinStarOptionValidationSchema>({
        resolver: zodResolver(MichelinStarValidationSchema),
        defaultValues: {
            type: preferences.prefersMichelinRated ? "yes" : "no",
        },
    });

    const onSubmit: SubmitHandler<TMichelinStarOptionValidationSchema> = async (data) => {
        console.log("Form data:", data);
        const prefersMichelinRated = data.type === "yes";
        try {
            await updatePreferences({ ...preferences, prefersMichelinRated });
            toast({
                title: "Success",
                description: "Your preferences have been updated",
            });
            router.push("/inital-preferences/ambiencepreferences");
        } catch (error) {
            console.error("Failed to update preferences:", error);
            toast({
                title: "Error",
                description: "Failed to update your preferences. Please try again.",
            });
        }
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
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="ml-2 text-center mb-4">
                                                        Yes
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="ml-2 text-center">
                                                        No
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>

                    <p className="text-xs text-center font-light">
                        Please choose if you would like to see restaurants that have been awarded
                        <span className="text-green-600"> michelin</span> stars, this will help us
                        match you with the restaurants that fit your preferences.
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
                            type="submit"
                            className={buttonVariants({
                                variant: "default",
                                className: "w-full py-2 text-white bg-black rounded-lg",
                                size: "sm",
                            })}>
                            Next
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
