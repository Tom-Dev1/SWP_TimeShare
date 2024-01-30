import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../hook/AuthContext";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { jwtDecode } from "jwt-decode";
const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.id]: "",
        });
    };
    const handleValidateFields = () => {
        let newErrors = {};
        if (!formData.username) {
            newErrors.username = "Tên người dùng không được để trống.";
        }
        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống.";
        }
        setErrors(newErrors);
        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = handleValidateFields();
        if (Object.keys(newErrors).length === 0) {
            try {
                const queryParams = new URLSearchParams({
                    username: formData.username,
                    password: formData.password,
                });

                const response = await axios.post(
                    `http://meokool-001-site1.ltempurl.com/api/Accounts/Signin?${queryParams}`,
                );

                if (response.data.data === null) {
                    Swal.fire({
                        icon: "error",
                        title: response.data.messageError,
                    });
                } else {
                    console.log(response);
                    Swal.fire({
                        icon: "success",
                        title: "Đăng nhập thành công",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem("userInfo");
                            const decodedToken = jwtDecode(response.data.data.accessToken);
                            console.log(decodedToken);
                            const userInfo = {
                                id: response.data.data.id,
                                fullName: response.data.data.fullName,
                                accessToken: response.data.data.accessToken,
                            };
                            login(userInfo);
                            if (decodedToken.name === "admin") {
                                navigate("/admin");
                            } else {
                                navigate("/");
                            }
                        }
                    });
                }
            } catch (error) {
                console.error("Login failed:", error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="sign-in-up-form">
            <h1 className="sign-up-title">Sign in</h1>
            <div className="social-container">
                <a href="#" className="social">
                    <GoogleIcon />
                </a>
            </div>
            <span className="introduce">or use your account</span>
            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type="text"
                        placeholder="Username"
                        name="Username"
                        id="username"
                        onChange={handleChange}
                    />
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
            </div>

            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        onChange={handleChange}
                    />
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
            </div>

            <a href="#" className="forgot">
                Forgot your password?
            </a>
            <button className="btn-form">Sign In</button>
        </form>
    );
};

export default SignIn;
