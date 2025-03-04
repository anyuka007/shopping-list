import "../../css/Login.css";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { loginUser } from "../../utils/login";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [fillingErrors, setFillingErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const inputHandler = (event, property) => {
    setFillingErrors((prevState) => ({ ...prevState, [property]: "" }));
    setFormData((prevState) => ({
      ...prevState,
      [property]: event.target.value.trim(),
    }));
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    let errors = {};

    if (!formData.email) {
      errors.email = "Fill in this field";
    } else if (!formData.email.includes("@")) {
      errors.email = "Incorrect format of email";
    }

    if (!formData.password) {
      errors.password = "Fill in this field";
    }
    setFillingErrors(errors);

    // Check if there are no errors
    if (Object.keys(errors).length === 0) {
      setLoading(true);

      try {
        // log in or becoming errors
        const loginError = await loginUser(formData.email, formData.password);

        if (loginError === "User not found") {
          setFillingErrors((prevErrors) => ({
            ...prevErrors,
            email: loginError,
          }));
          
        } else if (loginError === "Invalid password") {
          setFillingErrors((prevErrors) => ({
            ...prevErrors,
            password: loginError,
          }));
          
        } else {
          await navigate("/");
        }
      } catch (error) {
        console.error("Unexpected error during login:", error);
        setFillingErrors((prevErrors) => ({
          ...prevErrors,
          general: "An unexpected error occurred. Please try again.",
        }));
      } 
        setLoading(false);
      
    }
  };

  return (
    <div className="login-container">
      <div className="login-container-img">
        <img
          className="login-container-img"
          /* src="../../../images/pexels-lum3n-44775-1410226.jpg" */
          src="https://images.pexels.com/photos/4210784/pexels-photo-4210784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                type="text"
                name="email"
                id="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(event) => {
                  inputHandler(event, "email");
                }}
              />
              <Mail className="input-icon" />
            </div>
            {fillingErrors.email && (
              <p className="form-validation-error">{fillingErrors.email}</p>
            )}
          </div>
          <div className="login-input-container">
            <label htmlFor="password">Password</label>
            <div className="login-input-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={(event) => inputHandler(event, "password")}
              />
              {!showPassword ? (
                <Eye
                  className="input-icon input-icon-eye"
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <EyeOff
                  className="input-icon input-icon-eye"
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
            {fillingErrors.password && (
              <p className="form-validation-error">{fillingErrors.password}</p>
            )}
          </div>
          <Button
            className="login-container-button"
            text="Log In"
            loading={loading}
            onClickHandler={loginHandler}
          />
          <div>
            <p>
              Do not have an account?{" "}
              <NavLink className="nav-link" to="/signup">
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
