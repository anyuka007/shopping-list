import "../../css/Login.css";
import { Mail, Eye /* , EyeOff */ } from "lucide-react";
import { NavLink } from "react-router-dom";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-container-img">
                <img
                    className="login-container-img"
                    src="../../../public/images/pexels-lum3n-44775-1410226.jpg"
                    alt="start-photo"
                />
            </div>
            <div className="login-container-form">
                <h1>Login to Your Account</h1>
                <form className="login-form">
                    <div className="login-input-container">
                        <label htmlFor="email">Email</label>
                        <div className="login-input-field">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@mail.com"
                            />
                            <Mail className="input-icon" />
                        </div>
                    </div>
                    <div className="login-input-container">
                        <label htmlFor="password">Password</label>
                        <div className="login-input-field">
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
                    <button
                        className="login-container-button"
                        onClick={() => alert("Login")}
                    >
                        Log In
                    </button>
                    <div>
                        <p>
                            Do not have an account?{" "}
                            <NavLink to="/signup">Sign up</NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
