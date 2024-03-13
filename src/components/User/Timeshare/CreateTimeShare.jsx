import { useState, useEffect } from "react";
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
  const [realestatId, setRealestateId] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [price, setPrice] = useState(""); // Added price state
  const [errors, setErrors] = useState({
    startDay: "",
    endDay: "",
    price: "",
  });

  useEffect(() => {
    setRealestateId(initialRealestateId || "");
  }, [initialRealestateId]);

  const handleValidate = () => {
    let formErrors = {};

    if (!startDay) {
      formErrors.startDay = "Vui lòng chọn ngày bắt đầu.";
    } else {
      formErrors.startDay = "";
    }

    if (!endDay) {
      formErrors.endDay = "Vui lòng chọn ngày kết thúc.";
    } else {
      formErrors.endDay = "";
    }

    if (!price) {
      formErrors.price = "Vui lòng nhập giá.";
    } else {
      formErrors.price = "";
    }

    setErrors(formErrors);

    return Object.values(formErrors).every((error) => error === ""); // Check if all errors are empty
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidate()) {
      return;
    }

    const timeShareData = {
      realestateId: initialRealestateId,
      memberId: userInfo.id,
      startDay,
      endDay,
      status: "1",
      price,
    };

    try {
      const response = await axios.post(
        BASE_URL + "API/TimeShares/CreateTimeShare",
        timeShareData
      );
      Swal.fire({
        icon: "success",
        title: "Tạo mới thành công !!!",
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

  const handleStartDayChange = (value) => {
    setStartDay(value);

    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(value) < today) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDay: "Ngày bắt đầu không thể nhỏ hơn hôm nay",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, startDay: "" }));
    }
  };

  const handlePriceChange = (value) => {
    setPrice(value);

    setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
  };

  const handleEndDayChange = (value) => {
    setEndDay(value);

    if (new Date(value) < new Date(startDay)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDay: "Ngày kết thúc không thể nhỏ hơn ngày bắt đầu",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, endDay: "" }));
    }
  };
  return (
    <div className="create-time-share">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Tạo timeshare
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle className="dialog-title">
          Tạo thời gian cho thuê
        </DialogTitle>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit} className="form">
            <Typography variant="h6" className="form-field">
              <label htmlFor="startDay" className="form-label">
                Ngày bắt đầu:
              </label>
              <input
                type="date"
                value={startDay}
                onChange={(e) => handleStartDayChange(e.target.value)}
              />
              {errors.startDay && (
                <span className="error-message">{errors.startDay}</span>
              )}
            </Typography>
            <Typography variant="h6" className="form-field">
              <label htmlFor="endDay" className="form-label">
                Ngày kết thúc:
              </label>
              <input
                type="date"
                value={endDay}
                onChange={(e) => handleEndDayChange(e.target.value)}
              />
              {errors.endDay && (
                <span className="error-message">{errors.endDay}</span>
              )}
            </Typography>
            <Typography variant="h6" className="form-field">
              <label htmlFor="price" className="form-label">
                Giá cho thuê:
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
              />
              {errors.price && (
                <span className="error-message">{errors.price}</span>
              )}
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
