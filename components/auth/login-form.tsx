"use client";

import { useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidationSchema, TLoginValidationSchema } from "@/schemas";
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
import { login } from "@/actions/login";

// Component for rendering the login form
export const LoginForm = () => {
    // Using react-transition to handle form submission
    const [isSubmitting, startTransition] = useTransition();
    const [validationError, setValidationError] = useState<string | undefined>("");
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>("");

    // Setting up form validation and default values using react-hook-form and Zod
    const form = useForm<TLoginValidationSchema>({
        resolver: zodResolver(LoginValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Function to handle form submission, logging data for now
    const onSubmit = (data: TLoginValidationSchema) => {
        setValidationError("");
        setValidationSuccess("");

        startTransition(() => {
            login(data).then((values) => {
                setValidationError(values.error);
                setValidationSuccess(values.success);
            });
        });
    };

    // Render method returning TSX for the login form
    return (
        <>
            <div className="flex items-center justify-center min-h-screen mx-auto">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        {/* <!-- Logo -->  className="h-20 w-20"*/}
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Hello Again!
                            <br />
                            <span className="text-green-600">Sign In</span>.
                        </h1>
                    </div>
                    <div className="grid gap-6">
                        <Form {...form}>
                            <form
                                className="space-y-4"
                                onSubmit={form.handleSubmit(onSubmit)}>
                                {/* Email input field */}
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
                                                        placeholder="Enter your Email"
                                                        type="email"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Password input field */}
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-green-600">
                                                    Password
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
                                <FormMessageError errorMessage={validationError} />
                                <FormMessageSuccess successMessage={validationSuccess} />
                                {/* Submission  field */}
                                <Button
                                    disabled={isSubmitting} // Disable button while submitting
                                    className="mt-auto py-4 m-auto w-full text-center"
                                    type="submit">
                                    Login
                                </Button>
                            </form>
                        </Form>

                        <Separator />
                        <p className="text-sm max-w-prose text-center text-muted-foreground text-gray-900">
                            OR
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() =>
                                    signIn("google", {
                                        callbackUrl: "/your-redirect-url",
                                    })
                                }
                                className="flex items-center justify-center gap-2 px-6 py-3 border border-grey-200 text-base font-medium rounded-md text-grey-900">
                                <FcGoogle className="text-sm text-gray-900" /> Continue with Google
                            </button>
                        </div>
                    </div>

                    <Link
                        href="/inital-preferences/register"
                        className={buttonVariants({
                            variant: "link",
                            className: "text-green-600 gap-1.5",
                        })}>
                        Dont Have an Account? Sign Up <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </>
    );
};
