import React, { useEffect, useState } from "react";
import {
  CreateBooking,
  CreatePayment,
  UpdateBookingStatus,
} from "../../API/APIConfigure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ButtonRentMore = ({ status, BookingInfo }) => {
  const [showRentMore, setShowRentMore] = useState(false);
  const [startDate, setStartDate] = useState(BookingInfo.endDay);
  const [endDate, setEndDate] = useState("");
  const [total, setTotal] = useState("");
  const [dayrent, setDayrent] = useState("");
  const isoDate = new Date(startDate).toISOString();
  const formattedDate = isoDate.slice(0, 10);
  const endDayIso = new Date(BookingInfo.endDay).toISOString();
  const minDate = endDayIso.slice(0, 10);
  const navigate = useNavigate();

  const handleRentMoreClick = () => {
    setShowRentMore(true);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleCancel = () => {
    setShowRentMore(false);
  };

  const handleSubmit = async (e) => {
    const data = {
      phone: BookingInfo.phone,
      fullName: BookingInfo.fullName,
      paymentID: null,
      timeshareId: BookingInfo.timeshareId,
      startDay: startDate,
      endDay: endDate,
      memberId: BookingInfo.memberId,
      amount: total,
      adult: BookingInfo.adult,
      children: BookingInfo.children,
      room: null,
      status: "1",
    };
    try {
      const response = await CreateBooking(data);
      console.log(response);
      const paymentData = {
        memberId: BookingInfo.memberId,
        money: total,
        bookingId: response.id,
        status: "1",
        title: "Thuê thêm",
        type: "Payment",
      };
      const responsePayment = await CreatePayment(paymentData);
      setShowRentMore(false);
      Swal.fire({
        icon: "success",
        title: "Đặt chỗ thành công",
      })
        .then(() => {
          UpdateBookingStatus(BookingInfo.id, "7");
        })
        .then(() => {
          navigate(`/user/checkout/${response.id}`);
        });
    } catch (err) {
      setShowRentMore(false);
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin",
      });
    }
  };
  useEffect(() => {
    const numberOfDays = Math.round(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    setDayrent(numberOfDays);
    const newTotal = BookingInfo.realestate.price * numberOfDays;
    setTotal(newTotal);
  }, [endDate, startDate, BookingInfo.realestate.price]);

  if (status === "5" || status === "6") {
    return (
      <div>
        {showRentMore ? (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div style={{ backgroundColor: "white", padding: "20px" }}>
              Ngày bắt đầu:
              <input
                min={minDate}
                type="date"
                value={formattedDate}
                onChange={handleStartDateChange}
              />
              Ngày kết thúc:
              <input
                min={minDate}
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
              <div>Số ngày thuê: {dayrent} ngày</div>
              <div>Tổng tiền thuê: {total.toLocaleString()}VNĐ</div>
              <button onClick={handleSubmit}>Gửi</button>
              <button onClick={handleCancel}>Hủy</button>
            </div>
          </div>
        ) : (
          <button onClick={handleRentMoreClick}>Thuê thêm</button>
        )}
      </div>
    );
  }

  return null;
};

export default ButtonRentMore;
