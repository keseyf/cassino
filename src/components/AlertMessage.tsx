interface AlertMessageProps {
    message: string;
    bg: string;
}

export default function AlertMessage({ message, bg }: AlertMessageProps) {
    return (
        <span className={`px-3 py-1 flex items-center justify-center ${bg} rounded animate-popup`}>
            <p className="text-white font-medium text-wrap">{message}</p>
        </span>
    );
}