import "../../css/SignUp.css";
import { User, Mail, Eye /* , EyeOff */ } from "lucide-react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-container-img">
                <img
                    className="signup-container-img"
                    src="../../../public/images/pexels-lum3n-44775-1410226.jpg"
                    alt="start-photo"
                />
            </div>
            <div className="signup-container-form">
                <h1>Create Your Account</h1>
                <form className="signup-form">
                    <div className="signup-input-container">
                        <label htmlFor="firstname">First name</label>
                        <div className="signup-input-field">
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="first name"
                            />
                            <User className="input-icon" />
                        </div>
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="lastname">Last name</label>
                        <div className="signup-input-field">
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="last name"
                            />
                            <User className="input-icon" />
                        </div>
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="email">Email</label>
                        <div className="signup-input-field">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@mail.com"
                            />
                            <Mail className="input-icon" />
                        </div>
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="password">Password</label>
                        <div className="signup-input-field">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                            />
                            <Eye
                                className="input-icon"
                                onClick={() => alert("Show password")}
                            />
                            {/* <EyeOff className="input-icon" /> */}
                        </div>
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="confirmpassword">
                            Confirm password
                        </label>
                        <div className="signup-input-field">
                            <input
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                placeholder="********"
                            />
                            <Eye
                                className="input-icon"
                                onClick={() => alert("Confirm password")}
                            />
                            {/* <EyeOff className="input-icon" /> */}
                        </div>
                    </div>
                    <button
                        className="signup-container-button"
                        onClick={() => alert("Create an account")}
                    >
                        Create Account
                    </button>
                    <div>
                        <p>
                            Have an account?{" "}
                            <NavLink to="/login">Sign in</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
