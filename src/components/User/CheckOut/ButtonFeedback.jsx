import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import { CreateFeedback, UpdateBookingStatus } from "../../API/APIConfigure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ButtonFeedback = ({ status, realID, bookingID }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const [rate, setRate] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = async () => {
    try {
      const feedbackData = {
        realestateID: realID,
        memberId: userInfo.id,
        text: text,
        rate: rate,
      };
      const response = await CreateFeedback(feedbackData);
      if (response) {
        Swal.fire({
          title: "Cảm ơn bạn đã đánh giá ",
          text: "Đánh giá của bạn góp phần giúp chúng tôi cải thiện dịch vụ tốt hơn",
          icon: "success",
        });
        UpdateBookingStatus(bookingID, "6");
      }
    } catch (err) {
      toast.error("Lỗi tạo feedback");
      console.error(err);
    }
  };

  return (
    <div>
      {status === "5" && <button onClick={handleButtonClick}>Đánh giá</button>}
      {showPopup && (
        <div className="popup">
          <h3>Đánh giá sản phẩm</h3>
          <input
            type="text"
            placeholder="Feedback Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <button onClick={handleSubmit}>Gửi</button>
          <button onClick={closePopup}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default ButtonFeedback;
