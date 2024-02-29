import CuisineCategories from "../CusineCategories";

export const InitialCusinePrefs = () => {
    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">Choose your favorite cuisines</h1>
                <CuisineCategories />
            </div>
        </div>
    );
};
