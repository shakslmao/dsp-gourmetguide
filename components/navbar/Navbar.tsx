"use client";

import { useCurrentUser } from "@/hooks/get-user";
import { Container } from "../Container";
import Logo from "./Logo";
import UserNavbar from "./UserNavbar";

export const Navbar = () => {
    return (
        <div className="fixed w-full">
            <div className="py-4">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <UserNavbar />
                    </div>
                </Container>
            </div>
        </div>
    );
};
