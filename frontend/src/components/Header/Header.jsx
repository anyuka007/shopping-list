import { useLogout } from "../../utils/useLogout";
import Button from "../Button/Button";
import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const logout = useLogout();
    const userName = localStorage.getItem("username");

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
                            onClickHandler={logout}
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
