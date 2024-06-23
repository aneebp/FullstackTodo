import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Add a request interceptor to attach the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        // Do not add Authorization header for registration or login endpoints
        if (token && !config.url.includes('/register') && !config.url.includes('/login')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
