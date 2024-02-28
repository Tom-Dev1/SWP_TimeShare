import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetAllBookingsByMemberID } from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [booking, setBooking] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchBooking = async () => {
    try {
      const response = await GetAllBookingsByMemberID(userInfo.id);
      setBooking(response ? [response] : []);
    } catch (err) {
      toast.error("Lỗi lấy thông tin Booking");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = booking.filter((item) => {
    return (
      selectedStatusFilter === "all" ||
      item.status.toString() === selectedStatusFilter
    );
  });

  const sliced = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    1: "Chờ thanh toán",
    2: "Đã xác nhận",
    3: "Đã hủy",
  };

  const statusColors = {
    1: "orange",
    2: "green",
    3: "red",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          style={{ marginTop: "30px", marginBottom: "20px" }}
        >
          <MenuItem value="all">Tất cả</MenuItem>
          {Object.keys(statusTexts).map((status) => (
            <MenuItem key={status} value={status}>
              {statusTexts[status]}
            </MenuItem>
          ))}
        </Select>

        <TableContainer component={Paper}>
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
            Timeshare Booking
          </h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Realestes
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Số Ngày
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Giá
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, sans-serif",
                  }}
                  align="center"
                >
                  Xem chi tiết
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sliced.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.timeshareId}</TableCell>
                  <TableCell align="center">
                    {Math.ceil(
                      (new Date(item.endDay) - new Date(item.startDay)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </TableCell>
                  <TableCell align="center">{item.amount}</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      color: statusColors[item.status],
                      fontWeight: "bold",
                    }}
                  >
                    {statusTexts[item.status]}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="success"
                      className="edit-btn"
                      onClick={() => navigate(`/hotels/${item.timeshareId}`)}
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
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;