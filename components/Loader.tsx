"use client";

import { PuffLoader } from "react-spinners";

const PageLoader = () => {
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center">
            <PuffLoader
                size={100}
                color="green"
            />
            <h2>Please Wait... We&apos;re Cooking</h2>
        </div>
    );
};
export default PageLoader;
