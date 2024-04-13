"use client";
import Image from "next/image";
import { IconType } from "react-icons";

interface FlagAvatarProps {
    src?: string | null | undefined;
    icon?: IconType | undefined;
}

const FlagAvatar = ({ src, icon }: FlagAvatarProps) => {
    // Assuming src is always a flag emoji or a path to a flag image
    const isEmoji = src && src.length <= 4;

    if (isEmoji) {
        return (
            <div
                className="rounded-full flex items-center justify-center"
                style={{}} // Adjust the styling as needed
                aria-label="Flag Avatar" // Using aria-label for accessibility
            >
                {src}
            </div>
        );
    } else {
        // Placeholder for handling flag images, adjust as needed
        return (
            <Image
                className="rounded-full"
                alt=""
                src={src || ""}
                sizes=""
            />
        );
    }
};

export default FlagAvatar;
