interface FormMessageErrorProps {
    errorMessage?: string;
}

export const FormMessageError = ({ errorMessage }: FormMessageErrorProps) => {
    if (!errorMessage) return null;

    return (
        <div className="bg-destructive/10 p-4 rounded-md flex justify-center gap-x-2 text-center text-sm text-destructive">
            <p>{errorMessage}</p>
        </div>
    );
};
