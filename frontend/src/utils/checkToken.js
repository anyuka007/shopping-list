import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        const isValid = decoded.exp * 1000 > Date.now();
        return isValid;
    } catch (error) {
        return false;
    }
};

export const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
};
