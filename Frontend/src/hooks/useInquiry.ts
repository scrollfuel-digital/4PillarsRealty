import { useState } from "react";
import api from "../utils/api";

interface InquiryPayload {
    name: string;
    email: string;
    phone: string;
    projectSlug: string;
    message: string;
}

interface UseInquiryReturn {
    submit: (payload: InquiryPayload) => Promise<boolean>;
    loading: boolean;
    error: string | null;
    success: boolean;
    reset: () => void;
}

export function useInquiry(): UseInquiryReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const submit = async (payload: InquiryPayload): Promise<boolean> => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post("/inquiries", payload);
            setSuccess(true);
            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setSuccess(false);
    };

    return { submit, loading, error, success, reset };
}
