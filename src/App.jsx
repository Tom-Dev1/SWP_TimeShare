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
import Timeshare from "./pages/timeshare/Timeshare";
import Posting from "./pages/posting/Posting";

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
      <Route path="/timeshare/:id" element={<Timeshare />} />
      <Route path="/posting/:id" element={<Posting />} />
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
        path="/admin/trade"
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
      <Route
        path="/admin/about"
        element={
          <AdminWrapper>
            <About />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/user"
        element={
          <AdminWrapper>
            <User />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/account"
        element={
          <AdminWrapper>
            <Account />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/wallet"
        element={
          <AdminWrapper>
            <Wallet />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/feedback"
        element={
          <AdminWrapper>
            <Feedback />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/booking"
        element={
          <AdminWrapper>
            <Booking />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/voucher"
        element={
          <AdminWrapper>
            <Voucher />
          </AdminWrapper>
        }
      />
      <Route
        path="/admin/realetates"
        element={
          <AdminWrapper>
            <Realestates />
          </AdminWrapper>
        }
      />
    </Routes>
  );
}

export default App;
