import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

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

    const handleValidateFields = () => {
        let newErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is empty.";
        }
        if (!formData.password) {
            newErrors.password = "Password is empty.";
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
                const res = await fetch("https://653ea1a29e8bd3be29df9516.mockapi.io/api/signup/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newFormData),
                });

                if (res.ok) {
                    setLoading(false);
                    navigate("/");
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
        <div>
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

                    <input
                        className="signup-input"
                        type="text"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <button disabled={loading} className="signup-button" type="submit">
                        {loading ? "Loading..." : "Sign up"}
                    </button>
                </form>
                <div className="signup-footer">
                    <p>Bạn chưa có tài khoản ? </p>
                    <Link to="/sign-up" className="signin-direction">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
