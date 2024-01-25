import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Paper, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import PopupStatus from "./PopupStatus";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { apiGetAccount, apiUpdateStatusAccount } from "../../../api";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [open, setOpen] = useState(false);

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

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <div className="main">
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
                {users.map((user) => (
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
