import "../../css/Start.css";

const Start = () => {
    return (
        <div className="start-container">
            <div className="start-container-img">
                <img
                    className="start-container-img"
                    src="../../../public/images/shoppingBags_1280.jpg"
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
                    <button
                        className="start-container-button"
                        onClick={() => alert("Log in")}
                    >
                        Log In
                    </button>
                    <button
                        className="start-container-button"
                        onClick={() => alert("Sign up")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Start;
