"use client";
import Image from "next/image";

interface FlagAvatarProps {
    src: string | null | undefined;
}

const FlagAvatar = ({ src }: FlagAvatarProps) => {
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
            <img
                className="rounded-full"
                alt=""
                src={src || ""}
            />
        );
    }
};

export default FlagAvatar;
