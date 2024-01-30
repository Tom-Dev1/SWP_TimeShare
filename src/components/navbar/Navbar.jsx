import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../hook/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import Swal from "sweetalert2";

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, user, logout } = useAuth();
    console.log(user);

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = "primary-search-account-menu";
    const handleLogin = () => {
        navigate("/login-register");
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: "Logout",
                text: "Are you sure you want to logout?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, logout!",
            });

            if (result.isConfirmed) {
                await logout();
                handleMenuClose();
                Swal.fire("Logged Out!", "You have been logged out.", "success");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            Swal.fire("Error", "An error occurred during logout.", "error");
        }
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>{user && <span>{user.fullName}</span>}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo"> Booking</span>
                <div className="navItems">
                    {isLoggedIn ? (
                        <>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            {renderMenu}
                        </>
                    ) : (
                        <>
                            <button className="navButton" onClick={handleLogin}>
                                Sign In
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
