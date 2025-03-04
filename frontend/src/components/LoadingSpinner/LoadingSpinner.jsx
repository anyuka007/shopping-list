import { ClipLoader } from "react-spinners";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    return (
           <div className="spinner-container">
            <ClipLoader size={50} />
           </div> 
    );
}

export default LoadingSpinner;
