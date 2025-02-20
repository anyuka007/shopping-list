import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "./checkToken";
export const useLogout = () => {
    const navigate = useNavigate();
    return () => {
        clearLocalStorage();
        navigate("/login");
    };
};
