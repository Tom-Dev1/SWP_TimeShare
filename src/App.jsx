import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Admin from "./pages/admin/Admin";
import About from "./pages/admin/About";
import Setting from "./pages/admin/Setting";
import Account from "./pages/admin/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/about" element={<About />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/admin/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
