"use client";

interface NavbarDropdownProps {
    onClick: () => void;
    fields: string;
}

const NavbarDropdown = ({ onClick, fields }: NavbarDropdownProps) => {
    return (
        <div
            onClick={onClick}
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
            {fields}
        </div>
    );
};

export default NavbarDropdown;
