import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Admin from "./pages/admin/Admin";
import About from "./pages/admin/About";
import User from "./pages/admin/User";
import Account from "./pages/admin/Account";
import Wallet from "./pages/admin/Wallet";
import Feedback from "./pages/admin/Feedback";
import Trade from "./pages/admin/Trade";
import Form from "./pages/form/Form";
import UserPage from "./pages/user/userPage";
import Booking from "./pages/admin/Booking";
import Voucher from "./pages/admin/Voucher";
import Realestates from "./pages/admin/Realestates";
import ErrorPage from "./pages/ErrorPage";

const AdminWrapper = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = userInfo?.isAdmin;
  return isAdmin ? children : <ErrorPage />;
};
const UserWrapper = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? children : <ErrorPage />;
};
function App() {
  return (
    <Routes>
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/login-register" element={<Form />} />
      <Route path="/hotels" element={<List />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route
        path="/user/*"
        element={
          <UserWrapper>
            <UserPage />
          </UserWrapper>
        }
      />

      {/* ProtectRouterAdmin */}
      <Route
        path="/admin/*"
        element={
          <AdminWrapper>
            <Trade />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminWrapper>
            <Admin />
          </AdminWrapper>
        }
      />
    </Routes>
  );
}

export default App;
