import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { CreateTrade } from "../../API/APIConfigure";
function ConfirmTrade({ yourReal, theirReal, startDay, endDay }) {
  const handleSubmit = async () => {
    try {
      const tradeData = {
        memberId1: yourReal.memberID,
        memberId2: theirReal.memberID,
        timeshareId1: yourReal.id,
        timeshareId2: theirReal.id,
        startDay: startDay,
        endDay: endDay,
        status: "1",
      };
      console.log(tradeData);
      const response = await CreateTrade(tradeData);
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Đã tạo yêu cầu trao đổi",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Lỗi khi tạo yêu cầu trao đổi",
      });
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ConfirmTrade;
