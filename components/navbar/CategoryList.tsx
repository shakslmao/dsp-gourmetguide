"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FlagAvatar from "../FlagAvatar";
import { useCallback } from "react";
import querystring from "query-string";

interface CategoryListProps {
    label: string;
    icon: string | undefined;
    selected?: boolean;
}

const CategoryList = ({ label, icon, selected }: CategoryListProps) => {
    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = querystring.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label.toLowerCase(),
        };

        if (params?.get("category") === label.toLowerCase()) {
            delete updatedQuery.category;
        }

        const url = querystring.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [params, label, router]);
    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
                ${selected ? "border-b-neutral-800" : "border-transparent"}
                ${selected ? "text-green-600" : "text-neutral-500"}`}>
            <FlagAvatar src={icon} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

export default CategoryList;
