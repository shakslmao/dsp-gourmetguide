"use client";

import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "../ui/switch";
import { toast } from "../ui/use-toast";

const FormSchema = z.object({
    accessibility_preference: z.boolean().default(false),
});

export const InitialAccessibilityPrefs = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { updatePreferences, preferences } = useUserPreferences();
    const router = useRouter();
    const handleNextOnClick = () => {
        router.push("/inital-preferences/register");
    };
    const handlePrevOnClick = () => {
        router.back();
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log(data.accessibility_preference);
        updatePreferences({ accessibilityFeatures: data.accessibility_preference });
        toast({
            title: "Success",
            description: "Accessibility preferences updated",
        });
        router.push("/inital-preferences/register");
    };
    console.log(preferences);

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Let us know your <span className="text-green-600">accessibility</span>{" "}
                    requirements
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
                                    name="accessibility_preference"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-center">
                                                    Accessibility Preferences
                                                </FormLabel>
                                                <FormDescription className="text-xs font-light">
                                                    Opt in to receive information on venues that
                                                    meet your accessibility needs, including
                                                    wheelchair access, visual and hearing
                                                    assistance, and more.
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
                            We strive to ensure everyone can enjoy their dining experience. Please
                            indicate if you require venues with specific{" "}
                            <span className="text-green-600">accessibility features</span>. This
                            helps us recommend restaurants that cater to your needs, making every
                            dining out experience comfortable and enjoyable.
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
                                onClick={() => handleNextOnClick()}
                                className={`${buttonVariants({
                                    variant: "default",
                                    className: "w-full py-2 text-white bg-black rounded-lg",
                                    size: "sm",
                                })}${
                                    preferences.accessibilityFeatures === null
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600"
                                }`}>
                                Next
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};
