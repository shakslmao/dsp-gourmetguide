"use client";

import { useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormMessageError } from "../formError";
import { FormMessageSuccess } from "../formSuccess";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationValidationSchema, TRegistrationValidationSchema } from "@/schemas/index";
import { signIn } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { register } from "@/actions/register";
import { LOGIN_REDIRECT } from "@/routes";
import { useUserPreferences } from "@/hooks/useUserCuisinePreferences";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const router = useRouter();
    const [isSubmitting, startTransition] = useTransition(); // Use the useTransition hook to manage state transitions for submitting the form.
    const [validationError, setValidationError] = useState<string | undefined>(""); // State to hold any validation errors that might occur.
    const [validationSuccess, setValidationSuccess] = useState<string | undefined>(""); // State to hold a message upon successful validation.
    const { preferences } = useUserPreferences();
    console.log(preferences);
    // Initialise the form with useForm, setting up validation schema and default values.
    // Use Zod for form validation, based on a predefined schema.
    const form = useForm<TRegistrationValidationSchema>({
        resolver: zodResolver(RegistrationValidationSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const handlePrevOnClick = () => {
        router.back();
    };
    // Function to handle form submission.
    const onSubmit = (data: TRegistrationValidationSchema) => {
        setValidationError(""); // Reset any previous validation errors.
        setValidationSuccess(""); // Reset any previous validation success messages.

        // Use startTransition for non-urgent state updates, improving user experience during form submission
        startTransition(() => {
            // Attempt to register the user with provided data.
            register(data).then((values) => {
                setValidationError(values.error);
                setValidationSuccess(values.success);
            });
        });
    };

    const onClick = (provider: "google") => {
        signIn(provider, { callbackUrl: LOGIN_REDIRECT });
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen mt-10">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        {/* <!-- Logo -->  className="h-20 w-20"*/}
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Final Step...
                            <br />
                            Lets Finish Your
                            <br />
                            <span className="text-green-600">Personalised</span>
                            &nbsp;Account
                            <span className="text-green-600">.</span>
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
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-green-600">
                                                    First Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isSubmitting} // Disable input while submitting
                                                        placeholder="Enter your First Name"
                                                        type="name"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="block text-medium text-green-600">
                                                    Confirm Password
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
                                    Finish Registration
                                </Button>
                            </form>
                        </Form>

                        <Separator />
                        <p className="text-sm max-w-prose text-center text-muted-foreground text-gray-900">
                            OR
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => onClick("google")}
                                className="flex items-center justify-center gap-2 px-6 py-3 border border-grey-200 text-base font-medium rounded-md text-grey-900">
                                <FcGoogle className="text-sm text-gray-900" /> Sign up with Google
                            </button>
                        </div>
                    </div>

                    <Link
                        href="/auth/login"
                        className={buttonVariants({
                            variant: "link",
                            className: "text-green-600 gap-1.5",
                        })}>
                        Already Signed Up? Sign-In
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Button
                        onClick={() => handlePrevOnClick()}
                        className={buttonVariants({
                            variant: "default",
                            className: "w-full py-2 text-white bg-black rounded-lg",
                            size: "sm",
                        })}>
                        Previous
                    </Button>
                </div>
            </div>
        </>
    );
};
