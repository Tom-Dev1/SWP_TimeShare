import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Admin from "./pages/admin/Admin";
import About from "./pages/admin/About";
import Setting from "./pages/admin/Setting";
import Account from "./pages/admin/Account";
import Wallet from "./pages/admin/Wallet";
import Feedback from "./pages/admin/Feedback";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/about" element={<About />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/admin/account" element={<Account />} />
          <Route path="/admin/wallet" element={<Wallet />} />
          <Route path="/admin/feedback" element={<Feedback />} />
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
