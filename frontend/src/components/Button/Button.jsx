import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./Button.css";
// eslint-disable-next-line react/prop-types
const Button = ({ text, width, height, fontSize, onClickHandler, loading }) => {
    return (
        <button
            className="button-component"
            style={{
                width: width || "100%",
                height: height || "5rem",
                fontSize: fontSize || "1.6rem",
            }}
            onClick={onClickHandler}
            disabled={loading}>
        {loading ? <LoadingSpinner color="var(--primaryColor)" size={25} /> : text}
        </button>
    );
};

export default Button;
