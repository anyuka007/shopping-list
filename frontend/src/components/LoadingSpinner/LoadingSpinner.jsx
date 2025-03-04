import { ClipLoader } from "react-spinners";
import "./LoadingSpinner.css";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const LoadingSpinner = ({color, size}) => {
    return (
           <div className="spinner-container">
            <ClipLoader size={size} override={override} speedMultiplier="0.5" color={color}/>
           </div> 
    );
}

export default LoadingSpinner;
