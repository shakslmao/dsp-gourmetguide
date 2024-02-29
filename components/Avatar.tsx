"use client";

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
}

const UserAvatar = ({ src }: AvatarProps) => {
    // Check if the source is an emoji (a simple check could be the string length for most flag emojis)
    const isEmoji = src && src.length <= 4;

    if (isEmoji) {
        return (
            <div
                className="rounded-full flex items-center justify-center"
                style={{}} // You can adjust the styling as needed
                aria-label="Avatar" // Using aria-label for accessibility
            >
                {src}
            </div>
        );
    } else {
        return (
            <Image
                className="rounded-full"
                height={40}
                width={40}
                alt="Avatar"
                src={src || "/images/defaultavatar.jpg"}
            />
        );
    }
};

export default UserAvatar;
