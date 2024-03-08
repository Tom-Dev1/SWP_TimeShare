import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UpdateStatusVoucherByID } from "../../API/APIConfigure";
import { Button } from "@mui/material";

const UpdateStatusVoucher = ({ voucherId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleUpdateStatus = async () => {
    try {
      const newStatus = status === true ? false : true;
      const response = await UpdateStatusVoucherByID(voucherId, newStatus);
      setStatus(newStatus);
      console.log(response.data);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleUpdateStatus}
        style={{ backgroundColor: status ? "red" : "green", color: "white" }}
      >
        {status ? "Vô hiệu hóa" : "Kích hoạt"}
      </Button>
    </div>
  );
};

export default UpdateStatusVoucher;
