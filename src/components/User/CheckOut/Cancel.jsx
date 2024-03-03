import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Cancel.css";

const Cancel = ({ status }) => {
  const [bookingStatus, setBookingStatus] = useState(status);

  const handleClick = () => {
    if (bookingStatus === "2") {
      Swal.fire({
        icon: "error",
        title: "Không thể hủy",
      });
    } else {
      Swal.fire({
        title: "Bạn có chắc chắn muốn hủy?",
        showDenyButton: true,
        confirmButtonText: `Có`,
        denyButtonText: `Không`,
        icon: "question",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put("/api/endpoint", { status: "3" })
            .then((response) => {
              setBookingStatus(response.data.status);
              Swal.fire({
                icon: "success",
                title: "Hủy thành công",
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  };

  return (
    <div>
      {bookingStatus !== "3" && (
        <button className="btn-cancel" onClick={handleClick}>
          Hủy đặt
        </button>
      )}
    </div>
  );
};

export default Cancel;
