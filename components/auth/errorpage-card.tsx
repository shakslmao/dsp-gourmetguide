import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

const ErrorPageCard = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center sm:text-6xl">
                    <span className="text-green-600">Ooops! </span> <br />
                    Something went wrong<span className="text-green-600">...</span>
                </h1>
                <div className="flex flex-col sm:flex-row gap-6 mt-8">
                    <Link
                        href="/auth/login"
                        className={buttonVariants()}>
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPageCard;
