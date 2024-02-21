import React, { useEffect, useState } from "react";

import { Box, Paper, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import { MenuItem, Select, TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { GetAllBookings } from "../../API/APIConfigure";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  console.log(currentUserId);
  const [open, setOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await GetAllBookings();
      setUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      setUsers([]);
      console.error(err);
    }
  };

  const handleClickOpen = (user) => {
    setOpen(true);
    setCurrentUserId(user);
  };
  const filteredStatus = users.filter((user) => {
    // Filter by status
    if (
      selectedStatusFilter !== "all" &&
      user.status !== selectedStatusFilter
    ) {
      return false;
    }

    // Filter by username
    if (
      searchTerm &&
      !user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const slicedUser = filteredStatus.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
          <Select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            style={{ marginTop: "30px" }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value={true}>Hoạt động</MenuItem>
            <MenuItem value={false}>Vô Hiệu Hóa</MenuItem>
          </Select>
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
                {slicedUser.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.memberId}
                    </TableCell>

                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.timeshareId}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.deposit}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.adult}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "13px",
                      }}
                      align="center"
                    >
                      {new Date(user.startDay).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.deposit}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                        onClick={() => handleClickOpen(user)}
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
              count={users.length}
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
