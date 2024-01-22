import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignUp.scss";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        setErrors({
            ...errors,
            [id]: "",
        });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleValidateFields = () => {
        let newErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is empty.";
        }

        if (!formData.email) {
            newErrors.email = "Email is empty.";
        }

        if (!formData.password) {
            newErrors.password = "Password is empty.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is empty.";
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone Number is empty.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.password = "Passwords do not match.";
        }

        setErrors(newErrors);
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = handleValidateFields();
        const newFormData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
        };

        if (Object.keys(newErrors).length === 0) {
            try {
                setLoading(true);
                const res = await fetch("https://653ea1a29e8bd3be29df9516.mockapi.io/api/signup/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newFormData),
                });

                if (res.ok) {
                    setLoading(false);
                    navigate("/sign-in");
                } else {
                    setLoading(false);
                    setErrors("An error occurred during signup. Please try again later.");
                }
            } catch (err) {
                setLoading(false);
                console.log(err.message);
            }
        }
    };

    return (
        <div className="signup-bg">
            <h1 className="signup-title">Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    className="signup-input"
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                />
                {errors.username && <p className="error-message">{errors.username}</p>}
                <input className="signup-input" type="email" placeholder="email" id="email" onChange={handleChange} />
                {errors.email && <p className="error-message">{errors.email}</p>}
                <input
                    className="signup-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
                <input
                    className="signup-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="confirm password"
                    id="confirmPassword"
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                <input
                    className="signup-input"
                    type="tel"
                    placeholder="phone number"
                    id="phoneNumber"
                    onChange={handleChange}
                />
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

                <div className="password-toggle" onClick={handleTogglePassword}>
                    {showPassword ? "Hide" : "Show"} Password
                </div>

                <button disabled={loading} className="signup-button" type="submit">
                    {loading ? "Loading..." : "Sign up"}
                </button>
            </form>
            <div className="signup-footer">
                <p>Have an account ? </p>
                <Link to="/sign-in" className="signin-direction">
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
