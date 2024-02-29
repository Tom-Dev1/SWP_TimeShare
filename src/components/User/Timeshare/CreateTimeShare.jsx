import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/APIConfigure";

function CreateTimeShare({
  onCreateSuccess,
  realestateId: initialRealestateId,
}) {
  const [open, setOpen] = useState(false);
  const [realestateId, setRealestateId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [status, setStatus] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    setRealestateId(initialRealestateId || "");
  }, [initialRealestateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeShareData = {
      realestateId: initialRealestateId,
      memberId: userInfo.id,
      startDay,
      endDay,
      status,
    };

    try {
      const response = await axios.post(
        BASE_URL + "API/TimeShares/CreateTimeShare",
        timeShareData
      );
      Swal.fire({
        icon: "success",
        title: "Tạo mới thành công, vui lòng chờ xác nhận !!!",
      });
      setOpen(false);
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Tạo mới thất bại, vui lòng thử lại!!!",
      });
    }
  };
  return (
    <div className="create-time-share">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="xl"
      >
        <DialogTitle className="dialog-title">Create Time Share</DialogTitle>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit} className="form">
            <Typography variant="h6" className="form-field">
              <label htmlFor="startDay" className="form-label">
                Start Day:
              </label>
              <input
                type="date"
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
              />
            </Typography>
            <Typography variant="h6" className="form-field">
              <label htmlFor="endDay" className="form-label">
                End Day:
              </label>
              <input
                type="date"
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
              />
            </Typography>
            <Button
              className="form-field"
              type="submit"
              variant="contained"
              color="primary"
            >
              Gửi
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTimeShare;
