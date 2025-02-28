import { useLogout } from "../../utils/useLogout";
import Button from "../Button/Button";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = () => {
    const location = useLocation();
    const logout = useLogout();
    const userName = localStorage.getItem("username");

    return (
        <div className="header-container">
            <div className="header-left">
                <img
                    /* src="./../../../images/APLists.png" */
                    src="./../../../images/Logo.png"
                    alt="Logo"
                />
            </div>
            <p>Plan better, Shop Smarter</p>
            {/*  it is only displayed if the pathname is  "/". */}
            {location.pathname === "/" && (
                <div className="header-right">
                    <div className="header-username">{`Hello, ${userName}`}</div>
                    <div>
                        <Button
                            onClickHandler={logout}
                            height="4rem"
                            text="Log Out"
                        />
                        <LogOut
                            className="header-logout-icon"
                            onClick={logout}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
