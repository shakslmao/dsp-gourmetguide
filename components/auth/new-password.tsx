"use client";

import { useState, useTransition } from "react";
import { Button, buttonVariants } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { FormMessageError } from "../formError";
import { FormMessageSuccess } from "../formSuccess";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { NewPasswordValidationSchema, TNewPasswordValidationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { newUserPassword } from "@/actions/new-password";
import Link from "next/link";
import { Separator } from "../ui/separator";

const NewPassword = () => {
    const [isSubmitting, startTransition] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<TNewPasswordValidationSchema>({
        resolver: zodResolver(NewPasswordValidationSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = () => {
        setValidationError("");
        setValidationSuccess("");

        startTransition(() => {
            newUserPassword(form.getValues(), token).then((values) => {
                setValidationError(values.error);
                setValidationSuccess(values.success);
            });
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center sm:text-6xl">
                        Reset Your <br />
                        <span className="text-green-600">Password</span>.
                    </h1>
                </div>

                <div className="grid gap-6">
                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}>
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
                                                    placeholder="Enter your new Password"
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
                                                    placeholder="Confirm your new Password"
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
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                    <Separator />
                    <p className="text-sm max-w-prose text-center text-muted-foreground text-gray-900">
                        <Link
                            href="/auth/reset"
                            className="hover:underline">
                            Send Another Reset Token
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
