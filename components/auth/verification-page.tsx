"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { PacmanLoader, DotLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerificationToken } from "@/actions/new-verification";
import { FormMessageError } from "../formError";
import { FormMessageSuccess } from "../formSuccess";

const VerificationPageCard = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("Missing Token!");
            return;
        }

        newVerificationToken(token)
            .then((res) => {
                setSuccess(res.success);
                setError(res.error);
            })
            .catch(() => setError("An Error Occurred! Please Try Again!"));
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center sm:text-6xl">
                    <span className="text-green-600">Please Wait...</span> <br />
                    We&apos;re Confirming your <span className="text-green-600">Verification</span>.
                </h1>

                <div className="mt-6 flex items-center w-full justify-center">
                    {!success && !error && <DotLoader />}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <Link
                        href="/auth/login"
                        className={buttonVariants({})}>
                        Back to Login
                    </Link>
                </div>
                <div className="mt-6 flex items-center w-full justify-center">
                    <FormMessageSuccess successMessage={success} />
                    {!success && <FormMessageError errorMessage={error} />}
                </div>
            </div>
        </div>
    );
};

export default VerificationPageCard;
