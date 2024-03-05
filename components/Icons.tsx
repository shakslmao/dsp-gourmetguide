import React from "react";
import { IconType } from "react-icons";

// Updated interface to correctly type the icon prop
interface IconProps {
    icon?: IconType; // This should be IconType or undefined
}

const Icons = ({ icon: Icon }: IconProps) => {
    // Check if Icon is provided and render it
    return (
        <div className="icon-container">
            {Icon && <Icon size={24} />} {/* Render the Icon with a specified size */}
        </div>
    );
};

export default Icons;
