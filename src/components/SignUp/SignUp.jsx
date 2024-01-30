import GoogleIcon from "@mui/icons-material/Google";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp = ({ handleToggleForm }) => {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        address: "",
        password: "",
        confirmPassword: "",
        phone: "",
        status: true,
        sex: true,
    });
    const [errors, setErrors] = useState({
        username: "",
        fullName: "",
        address: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleValidateFields = () => {
        let newErrors = {};

        if (!formData.username) {
            newErrors.username = "Tên người dùng không được để trống.";
        }

        if (!formData.fullName) {
            newErrors.fullName = "Họ và tên không được để trống.";
        }

        if (!formData.address) {
            newErrors.address = "Địa chỉ không được để trống.";
        }

        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống.";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống.";
        }

        if (!formData.phone) {
            newErrors.phone = "Số điện thoại không được để trống.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp.";
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ [0-10].";
        }
        setErrors(newErrors);
        return newErrors;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const idSex = id === "sex" ? value === "male" : value;
        setFormData({
            ...formData,
            [id]: idSex,
        });
        setErrors({
            ...errors,
            [id]: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = handleValidateFields();

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post("http://meokool-001-site1.ltempurl.com/api/Accounts/SignUpUser", {
                    username: formData.username,
                    fullName: formData.fullName,
                    address: formData.address,
                    password: formData.password,
                    phone: formData.phone,
                    status: formData.status,
                    sex: formData.sex,
                });
                console.log(response);
                if (response.data.data === null) {
                    Swal.fire({
                        icon: "error",
                        title: response.data.messageError,
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Tạo tài khoản thành công !!!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("Người dùng đã nhấp OK");
                            handleToggleForm();
                        }
                    });
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className="sign-in-up-form">
            <h1 className="sign-up-title">Create Account</h1>
            <div className="social-container">
                <a href="#" className="social">
                    <i className="fab fa-google-plus-g">
                        <GoogleIcon />
                    </i>
                </a>
            </div>
            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={formData.username}
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
            </div>
            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
            </div>
            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type="text"
                        placeholder="Full Name"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">
                    {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>
            </div>
            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type="text"
                        placeholder="Address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
            </div>
            <div className="infield">
                <select
                    className="input-infield"
                    placeholder="Sex"
                    id="sex"
                    value={formData.sex ? "male" : "female"}
                    onChange={handleChange}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label className="input__label-field"></label>
            </div>

            <div className="infield">
                <div className="infield-text">
                    <input
                        className="input-infield"
                        type="text"
                        placeholder="Phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <label className="input__label-field"></label>
                </div>
                <div className="error-box">{errors.phone && <span className="error-message">{errors.phone}</span>}</div>
            </div>
            <button className="btn-form">Sign Up</button>
        </form>
    );
};

export default SignUp;