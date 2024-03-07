// import { AccountCircle } from "@mui/icons-material";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import { useAuth } from "../../hook/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./navbar.css";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// function Navbar() {
//     const navigate = useNavigate();
//     const { isLoggedIn, logout } = useAuth();
//     const [anchorEl, setAnchorEl] = useState(null);
//     const isMenuOpen = Boolean(anchorEl);
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };
//     const menuId = "primary-search-account-menu";
//     const handleLogin = () => {
//         navigate("/login-register");
//     };
//     const handleMyAccount = () => {
//         navigate("/user/profile");
//         handleMenuClose();
//     };
//     const handleProfileMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleLogout = async () => {
//         try {
//             const result = await Swal.fire({
//                 title: "Đăng xuất",
//                 text: "Bạn có muốn đăng xuất",
//                 icon: "question",
//                 showCancelButton: true,
//                 confirmButtonColor: "#3085d6",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Có!",
//             });

//             if (result.isConfirmed) {
//                 await logout();
//                 handleMenuClose();
//                 Swal.fire("Đăng xuất!", "You have been logged out.", "success");
//                 navigate("/");
//             }
//         } catch (error) {
//             console.error("Error during logout:", error);
//             Swal.fire("Error", "An error occurred during logout.", "error");
//         }
//     };

//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "right",
//             }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//             }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             <MenuItem onClick={handleMyAccount}>Tài Khoản Của Tôi</MenuItem>
//             <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
//         </Menu>
//     );
//     const handleBookingClick = () => {
//         localStorage.removeItem("searchkey");
//     };
//     return (
//         <div className="navbar">
//             <div className="navContainer">
//                 <Link to="/" className="logo" onClick={handleBookingClick}>
//                     Booking
//                 </Link>
//                 <div className="navItems">
//                     {isLoggedIn ? (
//                         <div className="btn-icon">
//                             <IconButton
//                                 edge="end"
//                                 aria-label="account of current user"
//                                 aria-controls={menuId}
//                                 aria-haspopup="true"
//                                 onClick={handleProfileMenuOpen}
//                                 color="inherit"
//                             >
//                                 <AccountCircle />
//                             </IconButton>
//                             {renderMenu}
//                         </div>
//                     ) : (
//                         <div className="btn-div">
//                             <button className="navButton" onClick={handleLogin}>
//                                 Đăng nhập
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../hook/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import imgLogo from "../../assets/img/logo.png";
function Navbar({ className }) {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuId = "primary-search-account-menu";
    const handleLogin = () => {
        navigate("/login-register");
    };
    const handleMyAccount = () => {
        navigate("/user/profile");
        handleMenuClose();
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
                navigate("/");
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
                vertical: "bottom",
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
            <MenuItem onClick={handleMyAccount}>Tài Khoản Của Tôi</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>
        </Menu>
    );
    const handleBookingClick = () => {
        localStorage.removeItem("searchkey");
    };
    return (
        <div className={`navbar-wrapper new-navbar-wrapper ${className}`}>
            <div className="ht_tablet_hide">
                <div className="navbar-container">
                    <div className="navbar-left">
                        <button className="btn_navbar-lef" onClick={handleBookingClick}>
                            <Link to="/" className="navbar-link">
                                <div className="navbar-logo">
                                    <img src={imgLogo} alt="" width={95} height={95} />
                                </div>
                                <span className="nav-logo_signature"> Booking</span>
                            </Link>
                        </button>
                    </div>
                    <div className="navbar-right">
                        {isLoggedIn ? (
                            <div className="btn-icon">
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
                            </div>
                        ) : (
                            <div className="btn-div">
                                <button className="navButton" onClick={handleLogin}>
                                    Đăng nhập
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
