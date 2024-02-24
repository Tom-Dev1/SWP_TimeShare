// import { useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";

// const ProtectRouter = ({ children }) => {
//     const user = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user || !user.user) {
//             navigate("/login-register", { replace: true });
//         } else if (user.user.isAdmin === true) {
//             navigate("/admin");
//         } else if (user.user.isAdmin === false) {
//             navigate("/");
//         }
//     }, [navigate, user.user]);

//     return children;
// };

// export default ProtectRouter;
