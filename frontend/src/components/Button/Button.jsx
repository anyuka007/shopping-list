// eslint-disable-next-line react/prop-types
import "./Button.css";

const Button = ({ text, width, height, fontSize, onClickHandler }) => {
    return (
        <button
            className="button-component"
            style={{
                width: width || "100%",
                height: height || "5rem",
                fontSize: fontSize || "1.6rem",
            }}
            onClick={onClickHandler}
        >
            {text}
        </button>
    );
};

export default Button;
