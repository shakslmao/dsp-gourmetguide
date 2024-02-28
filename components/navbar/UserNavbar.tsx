"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { useCurrentUser } from "@/hooks/get-user";
import UserAvatar from "../Avatar";
import Link from "next/link";
import NavbarDropdown from "./Navbar-Dropdown";
import { logout } from "@/actions/logout";
import { useCallback, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserNavbar = () => {
    const currentUser = useCurrentUser();
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdown = useCallback(() => {
        setShowDropdown((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                {/* if there is no current user  */}
                {!currentUser ? (
                    <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-green-600 hover:text-white transition cursor-pointer">
                        Start your personalisation
                    </div>
                ) : null}
                {/* conditional rendering based on currentUser */}
                {currentUser ? (
                    <div className="flex flex-col cursor-pointer">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                                <AiOutlineMenu />
                                <UserAvatar src={currentUser.image} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Themes</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Pink</DropdownMenuItem>
                                            <DropdownMenuItem>Blue</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>More...</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="py-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                        <div className="hidden md:flex gap-2">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserNavbar;
