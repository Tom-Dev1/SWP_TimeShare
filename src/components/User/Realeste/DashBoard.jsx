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
import {
  GetAllRealestatesByMemberID,
  UpdateRealestateStatus,
} from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";
import CreateReal from "./CreateReal";

const Dashboard = () => {
  const [realestates, setRealestates] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchRealestates = async () => {
    try {
      const response = await GetAllRealestatesByMemberID(userInfo.id);
      setRealestates(response ? [response] : []);
    } catch (err) {
      toast.error("Failed to fetch Realestates");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRealestates();
  }, []);

  useEffect(() => {}, [realestates]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filtered = realestates.filter((item) => {
    return (
      selectedStatusFilter === "all" ||
      item.status.toString() === selectedStatusFilter
    );
  });

  const slicedFeedback = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusTexts = {
    1: "Chờ xác nhận",
    2: "Đã xác nhận",
    3: "Tạm dừng",
    4: "Vô hiệu hóa",
    5: "Từ chối",
  };

  const statusColors = {
    1: "orange",
    2: "green",
    3: "gray",
    4: "red",
    5: "red",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <Select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            {Object.keys(statusTexts).map((status) => (
              <MenuItem key={status} value={status}>
                {statusTexts[status]}
              </MenuItem>
            ))}
          </Select>
          <CreateReal onCreateSuccess={fetchRealestates} />
        </Box>
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
            Bất Động Sản Của Bạn
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
                  Địa điểm
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
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedFeedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.location}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
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
                      onClick={() => navigate(`/hotels/${item.id}`)}
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