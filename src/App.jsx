import { Routes, Route } from "react-router-dom";
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
import Booking from "./pages/admin/Booking";
import Voucher from "./pages/admin/Voucher";
import Realestates from "./pages/admin/Realestates";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/admin/trade" element={<Trade />} />
      <Route path="/" element={<Home />} />
      <Route path="/login-register" element={<Form />} />
      <Route path="/hotels" element={<List />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/about" element={<About />} />
      <Route path="/admin/user" element={<User />} />
      <Route path="/admin/account" element={<Account />} />
      <Route path="/admin/wallet" element={<Wallet />} />
      <Route path="/admin/feedback" element={<Feedback />} />
      <Route path="/admin/booking" element={<Booking />} />
      <Route path="/admin/voucher" element={<Voucher />} />
      <Route path="/admin/realetates" element={<Realestates />} />
    </Routes>
  );
}

export default App;
