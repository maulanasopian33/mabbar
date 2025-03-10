// axiosInstance.js
import axios from 'axios';
import { getSession } from './sessionManager.js';

// Buat instance axios
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API, // Sesuaikan dengan URL API kamu
});
axios.defaults.withCredentials = true;
// Interceptor untuk menyisipkan Bearer Token di header Authorization
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getSession('Token'); // Ambil token dari localStorage atau sumber lain
        // console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;