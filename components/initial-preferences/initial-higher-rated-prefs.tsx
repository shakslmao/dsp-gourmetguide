"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { Button, buttonVariants } from "../ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
    higher_rated_preferences: z.boolean().default(false),
});

export const InitialHigherRatedPrefs = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { preferences, updatePreferences } = useUserPreferences();
    const router = useRouter();
    const handlePrevOnClick = () => {
        router.back();
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        updatePreferences({ prefersHigherRated: data.higher_rated_preferences });
        toast({
            title: "Success",
            description: "Preferences updated",
        });
        router.push("/inital-preferences/accessibilitypreferences");
    };

    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Would you like to be recommended
                    <span className="text-green-600"> higher rated </span>
                    restaurants.
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6">
                        <div>
                            <h3 className="mb-4 text-lg font-medium"></h3>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="higher_rated_preferences"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-center">
                                                    Highly Rated Restaurants
                                                </FormLabel>
                                                <FormDescription className="text-xs font-light">
                                                    Opt in to receive restaurnats that have been
                                                    awarded high reviews.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <p className="text-xs text-center font-light">
                            Please choose if you would like to see restaurants that have been
                            awarded
                            <span className="text-green-600"> higher</span> stars, this will help us
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
                                className={buttonVariants({
                                    variant: "default",
                                    className: "w-full py-2 text-white bg-black rounded-lg",
                                    size: "sm",
                                })}>
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
