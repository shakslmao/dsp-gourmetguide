"use client";

import { useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordValidationSchema, TResetValidationSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { FormMessageError } from "../formError";
import { FormMessageSuccess } from "../formSuccess";

export const ResetPassword = () => {
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>("");
    const [isSubmitting, startTransition] = useTransition();

    const form = useForm<TResetValidationSchema>({
        resolver: zodResolver(ResetPasswordValidationSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: TResetValidationSchema) => {
        setValidationError("");
        setValidationSuccess("");

        startTransition(() => {});
    };
    return (
        <div>
            <>
                <div className="flex items-center justify-center min-h-screen mx-auto">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col items-center space-y-2 text-center">
                            {/* <!-- Logo -->  className="h-20 w-20"*/}
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Let&apos;s Reset Your <br />
                                <span className="text-green-600">Password</span>.
                            </h1>
                        </div>
                        <div className="grid gap-6">
                            <Form {...form}>
                                <form className="space-y-4">
                                    {/* Password input field */}
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-medium text-green-600">
                                                        New Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isSubmitting} // Disable input while submitting
                                                            placeholder="Enter your Password"
                                                            type="password"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-center" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-medium text-green-600">
                                                        Confirm New Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isSubmitting} // Disable input while submitting
                                                            placeholder="Please Confirm your Password"
                                                            type="password"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-center" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormMessageError errorMessage={validationError} />
                                    <FormMessageSuccess successMessage={validationSuccess} />
                                    {/* Submission  field */}
                                    <Button
                                        disabled={isSubmitting} // Disable button while submitting
                                        className="mt-auto py-4 m-auto w-full text-center"
                                        type="submit">
                                        Reset Now
                                    </Button>
                                </form>
                            </Form>
                            <Separator />
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};
