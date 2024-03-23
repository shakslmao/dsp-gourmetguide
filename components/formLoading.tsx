import { BeatLoader, ClipLoader } from "react-spinners";

interface FormLoadingProps {
    loadingMessage?: string;
}

export const FormLoadingState = ({ loadingMessage }: FormLoadingProps) => {
    if (!loadingMessage) return null;
    return (
        <div className="bg-orange-500/10 p-4 rounded-md flex flex-col items-center justify-center text-center text-sm text-orange-500">
            <p>{loadingMessage}</p>
            {/* Add some vertical space if needed, e.g., mb-2 for margin bottom */}
            <div className="mt-4">
                <BeatLoader
                    size={8}
                    color="#ff6300"
                />
            </div>
        </div>
    );
};
