import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-left">
                <p>Plan better, Shop Smarter</p>
            </div>
            <div className="header-right">
                <div>UserName/optional</div>
                <div>
                    <button>Log out</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
