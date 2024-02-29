import CuisineCategories from "../CusineCategories";

export const InitialCusinePrefs = () => {
    return (
        <div className="flex items-center justify-center min-h-screen mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <h1 className="text-2xl font-bold text-center">
                    Choose your <span className="text-green-600">favourite</span> cuisines.
                </h1>
                <CuisineCategories />
                <p className="text-xs text-center font-light">
                    Please click on the card to select your cuisine preferences, you may choose as
                    many as you like
                </p>
            </div>
        </div>
    );
};
