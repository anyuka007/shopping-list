import { clearLocalStorage } from "../../utils/checkToken";
import Button from "../Button/Button";
import "./Header.css";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const userName = localStorage.getItem("username");
    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate("/login");
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
                        <Button
                            onClickHandler={logoutHandler}
                            height="4rem"
                            text="Log Out"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
