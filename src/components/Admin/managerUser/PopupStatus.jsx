import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const PopupStatus = ({ open, handleClose, handleUpdateStatus }) => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdate = () => {
    handleUpdateStatus(status);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Status</DialogTitle>
      <DialogContent>
        <DialogContentText>Cập nhật trạng thái</DialogContentText>
        <Select value={status} onChange={handleChange}>
          <MenuItem value={true}>Hoạt đọng</MenuItem>
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
