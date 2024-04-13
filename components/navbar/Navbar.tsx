"use client";

import { useCurrentUser } from "@/hooks/get-user-data";
import { Container } from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import UserNavbar from "./UserNavbar";

export const Navbar = () => {
    const currentUser = useCurrentUser();

    return (
        <div className="py-2 fixed w-full">
            <div className="py-4 bg-white">
                <Container>
                    <div className="flex flex-row items-center justify-center gap-3 md:gap-0">
                        <Logo />
                        <UserNavbar />
                    </div>
                </Container>
                {currentUser?.currentUser && <Categories />}
            </div>
        </div>
    );
};
