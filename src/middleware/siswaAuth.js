import { getSession } from '@/libs/sessionManager.js';
import { jwtDecode } from "jwt-decode";

export default function ({ next, router }) {
    const token = getSession('Token');

    if (!token) {
        return router.push('/login'); // Redirect jika token tidak ada
    }

    try {
        const decoded = jwtDecode(token);

        // Periksa apakah token sudah expired
        if (decoded.exp * 1000 < Date.now()) {
            console.warn('Token expired');
            router.push('/login'); // Redirect ke login
            return; // Hentikan eksekusi middleware
        }

        return next(); // Lanjutkan navigasi
    } catch (error) {
        console.error('Invalid Token:', error.message);
        router.push('/login');
        return;
    }
}
