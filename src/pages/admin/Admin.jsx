import Sidebar from "../../components/Admin/sidebar/Sidebar";
import Navbar from "../../components/Admin/navbar/Navbar";
import Box from "@mui/material/Box";
import Booking from "../../components/Admin/dashboard/Booking";
import TableBooking from "../../components/Admin/dashboard/TableBooking";
import PieUser from "../../components/Admin/dashboard/PieUser";
import Total from "../../components/Admin/dashboard/Total";
import LineChartTotal from "../../components/Admin/dashboard/LineChartTotal";

export default function Admin() {
  return (
    <div>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 3, p: 3 }}>
          <Booking />
          <PieUser />
          <Total />
          <LineChartTotal />
          <TableBooking />
        </Box>
      </Box>
    </div>
  );
}
