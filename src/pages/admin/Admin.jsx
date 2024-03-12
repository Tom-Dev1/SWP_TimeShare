import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";
import Box from "@mui/material/Box";
import Booking from "../../components/Admin/dashboard/Booking";
import TableBooking from "../../components/Admin/dashboard/TableBooking";

export default function Admin() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Booking />
          <TableBooking />
        </Box>
      </Box>
    </div>
  );
}
