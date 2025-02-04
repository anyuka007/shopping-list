import "../../css/SignUp.css";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const inputHandler = (event, property) => {
        setValidationErrors((prevState) => ({ ...prevState, [property]: "" }));
        setFormData((prevState) => ({
            ...prevState,
            [property]: event.target.value.trim(),
        }));
    };

    const createUser = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                password: formData.password,
            }),
        };
        try {
            const response = await fetch(
                "http://localhost:5000/register",
                requestOptions
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("User created successfully:", data);
        } catch (error) {
            console.error(
                "There was a problem with the fetch operation:",
                error
            );
        }
    };

    const createUserHandler = (event) => {
        event.preventDefault();
        let errors = {};

        // Validate firstname
        if (/^(?![a-zA-Z]+$)/.test(formData.firstname)) {
            errors.firstname = "User name contains invalid characters";
        } else if (!formData.firstname) {
            errors.firstname = "Fill in this field";
        }

        // Validate lastname
        if (/^(?![a-zA-Z]+$)/.test(formData.lastname)) {
            errors.lastname = "User lastname contains invalid characters";
        } else if (!formData.lastname) {
            errors.lastname = "Fill in this field";
        }

        // Validate email
        if (!formData.email) {
            errors.email = "Fill in this field";
        } else if (!formData.email.includes("@")) {
            errors.email = "Incorrect format of email";
        }

        // Validate password
        if (!formData.password) {
            errors.password = "Fill in this field";
        } else if (formData.password.length < 8) {
            errors.password = "Password should contain min 8 characters";
        }

        // Validate confirmPassword
        if (!formData.confirmPassword) {
            errors.confirmPassword = "Fill in this field";
        } else if (formData.confirmPassword.length < 8) {
            errors.confirmPassword = "Password should contain min 8 characters";
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        // Set validation errors
        setValidationErrors(errors);

        // Check if there are no errors
        if (Object.keys(errors).length === 0) {
            createUser();
            alert("User is created");
            console.log(formData);
        }
    };

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
                <form className="signup-form" onSubmit={createUserHandler}>
                    <div className="signup-input-container">
                        <label htmlFor="firstname">First name</label>
                        <div className="signup-input-field">
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder="first name"
                                value={formData.firstname}
                                onChange={(event) =>
                                    inputHandler(event, "firstname")
                                }
                            />
                            <User className="input-icon" />
                        </div>
                        {validationErrors.firstname && (
                            <p className="form-validation-error">
                                {validationErrors.firstname}
                            </p>
                        )}
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="lastname">Last name</label>
                        <div className="signup-input-field">
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="last name"
                                value={formData.lastname}
                                onChange={(event) =>
                                    inputHandler(event, "lastname")
                                }
                            />
                            <User className="input-icon" />
                        </div>
                        {validationErrors.lastname && (
                            <p className="form-validation-error">
                                {validationErrors.lastname}
                            </p>
                        )}
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="email">Email</label>
                        <div className="signup-input-field">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={(event) =>
                                    inputHandler(event, "email")
                                }
                            />
                            <Mail className="input-icon" />
                        </div>
                        {validationErrors.email && (
                            <p className="form-validation-error">
                                {validationErrors.email}
                            </p>
                        )}
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="password">Password</label>
                        <div className="signup-input-field">
                            <input
                                type={showPassword ? "text " : "password"}
                                name="password"
                                id="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={(event) => {
                                    inputHandler(event, "password");
                                }}
                            />
                            {!showPassword ? (
                                <Eye
                                    className="input-icon"
                                    onClick={() => setShowPassword(true)}
                                />
                            ) : (
                                <EyeOff
                                    className="input-icon"
                                    onClick={() => setShowPassword(false)}
                                />
                            )}
                        </div>
                        {validationErrors.password && (
                            <p className="form-validation-error">
                                {validationErrors.password}
                            </p>
                        )}
                    </div>
                    <div className="signup-input-container">
                        <label htmlFor="confirmpassword">
                            Confirm password
                        </label>
                        <div className="signup-input-field">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmpassword"
                                id="confirmpassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={(event) => {
                                    inputHandler(event, "confirmPassword");
                                }}
                            />
                            {!showConfirmPassword ? (
                                <Eye
                                    className="input-icon"
                                    onClick={() => setShowConfirmPassword(true)}
                                />
                            ) : (
                                <EyeOff
                                    className="input-icon"
                                    onClick={() =>
                                        setShowConfirmPassword(false)
                                    }
                                />
                            )}
                        </div>
                        {validationErrors.confirmPassword && (
                            <p className="form-validation-error">
                                {validationErrors.confirmPassword}
                            </p>
                        )}
                    </div>
                    <button className="signup-container-button">
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
