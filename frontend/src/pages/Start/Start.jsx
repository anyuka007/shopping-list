import { useNavigate } from "react-router-dom";
import "../../css/Start.css";
import Button from "../../components/Button/Button";

const Start = () => {
    const navigate = useNavigate();
    return (
        <div className="start-container">
            <div className="start-container-img">
                <img
                    src="../../../images/shoppingBags_1280.jpg"
                    alt="start-photo"
                />
            </div>
            <div className="start-container-text">
                <h1>Welcome to Your Shopping Assistant!</h1>
                <div className="start-description">
                    <h3>Plan your shopping with ease and convenience</h3>
                    <h3>
                        Add items to your lists, stay organized, and save time!
                    </h3>
                </div>
                <h4>
                    Ready to get started? To continue, log in or create an
                    account.
                </h4>
                <div className="start-container-buttons">
                    <Button
                        className="start-container-button"
                        /* onClick={() => alert("Log in")} */
                        onClickHandler={() => navigate("/login")}
                        width="20rem"
                        text="Log In"
                    />
                    <Button
                        className="start-container-button"
                        onClickHandler={() => navigate("/signup")}
                        text="Sign Up"
                        width="20rem"
                    />
                </div>
            </div>
        </div>
    );
};

export default Start;
