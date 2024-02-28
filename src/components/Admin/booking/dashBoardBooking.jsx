import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllBookings, GetUserByID } from "../../API/APIConfigure";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await GetAllBookings();
        setBookings(Array.isArray(response) ? response : []);
        // Sau khi nhận được bookings, lấy thông tin người dùng
        fetchUserDetails(response.map((booking) => booking.memberId));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, []);

  const fetchUserDetails = async (memberIds) => {
    memberIds.forEach(async (id) => {
      if (!userDetails[id]) {
        // Tránh gọi lại nếu đã có thông tin
        try {
          const response = await GetUserByID(id);
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            [id]: response.username,
          }));
        } catch (err) {
          console.error(err);
          toast.error(`Failed to fetch user details for memberId: ${id}`);
        }
      }
    });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBookings = bookings.filter((booking) => {
    const userName = userDetails[booking.memberId] || "";
    return (
      !searchTerm || userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const slicedBookings = filteredBookings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <TextField
            label="Tên tài khoản"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: "30px", marginLeft: "20px" }}
          />
          <TableContainer component={Paper} className="dashboard-container">
            <h2
              style={{
                textAlign: "center",
                color: "#205295",
                fontSize: "40px",
                marginTop: "20px",
                marginBottom: "20px",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
              }}
            >
              Booking
            </h2>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="staff-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Người dùng
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Địa điểm
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Tiền cọc
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Số người
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Ngày đặt
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Hành Động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {userDetails[booking.memberId] || booking.memberId}
                    </TableCell>

                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {booking.timeshareId}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {booking.deposit}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {booking.adult}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "13px",
                      }}
                      align="center"
                    >
                      {new Date(booking.startDay).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {booking.deposit}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                      >
                        <VisibilityIcon sx={{ fontSize: 25 }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={bookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
