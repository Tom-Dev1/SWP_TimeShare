import { Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRoute = ({ children, ...props }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.isAdmin;
  console.log(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return isAdmin ? <Route {...props}>{children}</Route> : null;
};

export default PrivateRoute;
