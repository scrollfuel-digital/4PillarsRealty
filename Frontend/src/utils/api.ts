import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
});

// Response interceptor — unwrap data, normalize errors
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message =
            error.response?.data?.error ||
            error.message ||
            "Something went wrong.";
        return Promise.reject(new Error(message));
    }
);

export default api;
