"use client";
import Image from "next/image";

const Logo = () => {
    return (
        <Image
            onClick={() => {}}
            className="hidden md:block cursor-pointer"
            src="/images/gglogo.png"
            width={180}
            height={180}
            alt="Logo"
        />
    );
};

export default Logo;
