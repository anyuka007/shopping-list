import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    return (
        <div className="header-container">
            <div className="header-left">
                <p>Plan better, Shop Smarter</p>
            </div>
            {/*  it is only displayed if the pathname is not "/start". */}
            {location.pathname !== "/start" && (
                <div className="header-right">
                    <div>UserName/optional</div>
                    <div>
                        <button>Log out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
