import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateStatus = ({ idTrade, status, datamem2 }) => {
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleConfirm = async () => {
    if (status === "1") {
      setIsLoading(true);
      try {
        // Make API call to update status to "2"
        await axios.put(
          `http://meokool-001-site1.ltempurl.com/api/Exchange/Updatestatus?id=${idTrade}`,
          { status: "2" }
        );
        // Handle success
        console.log('Status updated to "2"');
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đã xác nhận thành công",
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        // Handle error
        console.error("Failed to update status:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = async () => {
    if (status === "1") {
      Swal.fire({
        title: "Bạn có chắc chắn muốn hủy?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có, hủy!",
        cancelButtonText: "Không!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          try {
            await axios.put(
              `http://meokool-001-site1.ltempurl.com/api/Exchange/Updatestatus?id=${idTrade}`,
              { status: "3" }
            );
            console.log('Status updated to "3"');
            Swal.fire({
              icon: "success",
              title: "Thành công",
              text: "Đã hủy thành công",
            }).then(() => {
              window.location.reload();
            });
          } catch (error) {
            console.error("Failed to update status:", error);
          } finally {
            setIsLoading(false);
          }
        }
      });
    }
  };

  return (
    <div>
      {status === "1" && userInfo && userInfo.id === datamem2?.id && (
        <>
          <button onClick={handleConfirm} disabled={isLoading}>
            Xác nhận
          </button>
          <button onClick={handleCancel} disabled={isLoading}>
            Hủy
          </button>
        </>
      )}
      {status === "2" && userInfo && userInfo.id === datamem2?.id && (
        <button disabled>Đã Xác nhận</button>
      )}
    </div>
  );
};

export default UpdateStatus;
