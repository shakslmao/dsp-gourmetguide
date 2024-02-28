import { Container } from "../Container";
import Logo from "./Logo";

export const Navbar = () => {
    return (
        <div className="fixed w-full">
            <div className="py-4">
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo />
                </div>
            </div>
        </div>
    );
};
