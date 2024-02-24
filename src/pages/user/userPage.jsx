import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { MenuItem } from "@mui/material";
import Order from "./Order";
import Footer from "../../components/footer/Footer";
import "./userPage.css";
const UserPage = () => {
    const [activeMenu, setActiveMenu] = useState("dashboard");

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <div className="profile-section">
                    <div className="profile-columns">
                        <div className="profile-row">
                            <div className="column-left">
                                <div className="user-card">
                                    <div className="avatar">
                                        <AccountCircle fontSize="large" />
                                    </div>
                                    <p className="avatar-text">TRan le huu phuoc</p>
                                </div>
                                <div className="sidebar-menu">
                                    <div className="user-list">
                                        <div className={`user-item ${activeMenu === "dashboard" ? "user-active" : ""}`}>
                                            <MenuItem
                                                component={Link}
                                                to="/user/dashboard"
                                                onClick={() => handleMenuClick("dashboard")}
                                            >
                                                Dashboard
                                            </MenuItem>
                                        </div>
                                        <div className={`user-item ${activeMenu === "profile" ? "user-active" : ""}`}>
                                            <MenuItem
                                                component={Link}
                                                to="/user/profile"
                                                onClick={() => handleMenuClick("profile")}
                                            >
                                                Profile
                                            </MenuItem>
                                        </div>
                                        <div className={`user-item ${activeMenu === "order" ? "user-active" : ""}`}>
                                            <MenuItem
                                                component={Link}
                                                to="/user/order"
                                                onClick={() => handleMenuClick("order")}
                                            >
                                                Orders
                                            </MenuItem>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column-right">
                                {activeMenu === "dashboard" && <Dashboard />}
                                {activeMenu === "profile" && <Profile />}
                                {activeMenu === "order" && <Order />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="homeContainer">
                <Footer />
            </div>
        </div>
    );
};

export default UserPage;
