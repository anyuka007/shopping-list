import { clearLocalStorage } from "../../utils/checkToken";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const userName = localStorage.getItem("username");
    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate("login");
        clearLocalStorage();
    };

    return (
        <div className="header-container">
            <div className="header-left">
                <p>Plan better, Shop Smarter</p>
            </div>
            {/*  it is only displayed if the pathname is  "/". */}
            {location.pathname === "/" && (
                <div className="header-right">
                    <div>{`Hello, ${userName}`}</div>
                    <div>
                        <button onClick={logoutHandler}>Log out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
