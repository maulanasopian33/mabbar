export const setSession = (key, value, expire) => {
    const now = new Date();
    const expireTime = now.getTime() + expire * 60000; // Konversi menit ke milidetik
    const data = {
        value: value,
        expireTime: expireTime
    };
    sessionStorage.setItem(key, JSON.stringify(data));
};

export const getSession = (key) => {
    const dataString = sessionStorage.getItem(key);
    if (dataString) {
        const data = JSON.parse(dataString);
        const now = new Date();
        if (now.getTime() > data.expireTime) {
            // Jika sudah expire, hapus data dari Session Storage
            sessionStorage.removeItem(key);
            return null;
        }
        return data.value;
    }
    return null;
}

export const removeSession = (key) => {
    sessionStorage.removeItem(key);
}