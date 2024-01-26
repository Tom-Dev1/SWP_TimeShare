import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MenuItem, Select, TextField } from "@mui/material";

import PopupStatus from "./PopupStatus";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { apiGetAccount, apiUpdateStatusAccount } from "../../../api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
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
      const response = await axios.get(apiGetAccount);
      setUsers(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (err) {
      setUsers([]);
      console.error(err);
    }
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setCurrentUserId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await axios.put(
        apiUpdateStatusAccount + `${currentUserId}`,
        { status: newStatus },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      fetchUsers();
      if (response.status === 200) {
        toast.success("Cập nhật thành công!");
      }
    } catch (err) {
      toast.error("Cập nhật thất bại!");
      console.error(err);
    }
    handleClose();
  };
  const RemoveFunction = (id) => {
    if (window.confirm(`Xóa: ${id}`)) {
      const baseUrl = `http://meokool-001-site1.ltempurl.com/api/Accounts/DeleteAccount`;
      fetch(baseUrl + "?id=" + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success(`Xóa tài khoản thành công!`);
            setUsers((users) => users.filter((user) => user.id !== id));
          } else {
            throw new Error("Xóa không thành công.");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.warning("Hủy bỏ xóa");
    }
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
              Tài Khoản Người Dùng
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
                    Tên tài khoản
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Tên người dùng
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Số điện thoại
                  </TableCell>
                  <TableCell
                    style={{
                      fontSize: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                    align="center"
                  >
                    Trạng Thái
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
                      {user.username}
                    </TableCell>

                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.fullName}
                    </TableCell>
                    <TableCell style={{ fontSize: "13px" }} align="center">
                      {user.phone}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "15px",
                        color: user.status ? "green" : "red",
                        fontWeight: "bold",
                      }}
                      align="center"
                    >
                      {user.status ? "Hoạt động" : "Vô hiệu hóa"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="success"
                        className="edit-btn"
                        onClick={() => handleClickOpen(user.id)}
                      >
                        <EditIcon sx={{ fontSize: 25 }} />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        className="delete-btn"
                        onClick={() => {
                          RemoveFunction(user.id);
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 25 }} />
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
          <PopupStatus
            open={open}
            handleClose={handleClose}
            handleUpdateStatus={handleUpdateStatus}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;
