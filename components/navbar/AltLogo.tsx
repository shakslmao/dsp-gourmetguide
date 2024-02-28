"use client";
import Image from "next/image";

const AltLogo = () => {
    return (
        <Image
            className="hidden md:block cursor-pointer"
            src="/images/faviconlogo.png"
            width={100}
            height={100}
            alt="Logo"
        />
    );
};

export default AltLogo;
