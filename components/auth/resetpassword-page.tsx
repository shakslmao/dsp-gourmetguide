"use client";

import { useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";
import { FormMessageError } from "../formError";
import { FormMessageSuccess } from "../formSuccess";
import { resetPassword } from "@/actions/reset-password";

export const ResetPassword = () => {
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>("");
    const [isSubmitting, startTransition] = useTransition();

    const form = useForm<TResetValidationSchema>({
        resolver: zodResolver(ResetPasswordValidationSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: TResetValidationSchema) => {
        setValidationError("");
        setValidationSuccess("");

        startTransition(() => {
            resetPassword(data).then((values) => {
                setValidationError(values.error);
                setValidationSuccess(values.success);
            });
        });
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
                                <form
                                    className="space-y-4"
                                    onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="block text-medium text-green-600">
                                                        Email
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            disabled={isSubmitting} // Disable input while submitting
                                                            placeholder="Enter your email"
                                                            type="email"
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
                                        Send Reset Link
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
