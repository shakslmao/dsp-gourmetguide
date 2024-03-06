"use client";
import { useCurrentUser } from "@/hooks/get-user";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import { NavigationDropdown } from "./NavigationDropdown";

const UserNavbar = () => {
    const currentUser = useCurrentUser();

    return (
        <div className="relative w-full">
            <div className="flex flex-row items-center justify-between">
                {/* Left side of the navbar  */}
                <div className="hidden md:block">{/* Placeholder for left side content */}</div>

                {/* Centered navigation dropdown */}
                {currentUser?.currentUser && (
                    <div className="flex justify-center">
                        <NavigationDropdown />
                    </div>
                )}

                {/* Right side of the navbar: User dropdown or sign in and blog links */}
                <div className="flex flex-row items-center gap-3">
                    {!currentUser?.currentUser ? (
                        <div className="py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                            <Link
                                href="/"
                                className="text-sm font-semibold py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer">
                                Start your personalisation
                            </Link>
                            <Link
                                href="/auth/login"
                                className="text-sm font-semibold py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer">
                                Sign In
                            </Link>
                            <Link
                                href="/"
                                className="text-sm font-semibold py-2 px-4 rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer">
                                Blog
                            </Link>
                        </div>
                    ) : (
                        <UserDropdown />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;
