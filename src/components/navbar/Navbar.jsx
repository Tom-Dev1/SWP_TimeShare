import "./navbar.css";
import { Navigate, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo"> Booking</span>
        <div className="navItems">
          <button onClick={handleRegister} className="navButton">
            Register
          </button>
          <button onClick={handleLogin} className="navButton">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
