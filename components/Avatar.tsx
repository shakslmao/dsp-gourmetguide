"use client";

import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
}

const UserAvatar = ({ src }: AvatarProps) => {
    return (
        <Image
            className="rounded-full"
            height={40}
            width={40}
            alt="Avatar"
            src={src || "/images/defaultavatar.jpg"}
        />
    );
};

export default UserAvatar;
