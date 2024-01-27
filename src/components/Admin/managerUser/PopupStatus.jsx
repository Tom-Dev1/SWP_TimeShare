import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, Typography } from "@mui/material";
import "./popup.css";
const PopupStatus = ({
  open,
  handleClose,
  handleUpdateStatus,
  currentUserId,
}) => {
  const [status, setStatus] = React.useState("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("xs");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleUpdate = () => {
    handleUpdateStatus(status);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="popupStatus"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle style={{ textAlign: "center" }}>Chỉnh sửa</DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Username: {currentUserId?.username}
        </Typography>
        <Typography variant="h6">
          Giới tính: {currentUserId?.sex === true ? "Nam" : "Nữ"}
        </Typography>
        <Typography variant="h6">
          Full Name: {currentUserId?.fullName}
        </Typography>
        <Typography variant="h6">Địa chỉ: {currentUserId?.address}</Typography>
        <Typography variant="h6">
          Số điện thoại: {currentUserId?.phone}
        </Typography>
        <InputLabel id="demo-simple-select-label">Chọn Trạng Thái</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Chọn trạng thái"
          onChange={handleChange}
        >
          <MenuItem value={true}>Hoạt động</MenuItem>
          <MenuItem value={false}>Vô Hiệu Hóa</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupStatus;
