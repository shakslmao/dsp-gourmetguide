interface FormMessageSuccessProps {
    successMessage?: string;
}

export const FormMessageSuccess = ({ successMessage }: FormMessageSuccessProps) => {
    if (!successMessage) return null;

    return (
        <div className="bg-emerald-500/10 p-4 rounded-md flex items-center justify-center gap-x-2 text-center text-sm text-emerald-500">
            <p>{successMessage}</p>
        </div>
    );
};
