import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./posting.css";
import { BASE_URL, CreateBooking } from "../../components/API/APIConfigure";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const Posting = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const Realestate = JSON.parse(localStorage.getItem("Realestate"));
  const imageReal = JSON.parse(localStorage.getItem("imageReal"));
  const [voucher, setVoucher] = useState("");
  const [voucherData, setVoucherData] = useState("");
  const [total, setTotal] = useState(Realestate.price);

  const [bookData, setBookData] = useState({
    timeshareId: id,
    startDay: "",
    endDay: "",
    memberId: userInfo.id,
    deposit: 0,
    amount: 0,
    adult: 0,
    children: 0,
    room: 0,
    fullName: "",
    status: "1",
  });
  const handleVoucherChange = (event) => {
    setVoucher(event.target.value);
  };
  const handleAddVoucher = async () => {
    try {
      const response = await axios.get(
        `http://meokool-001-site1.ltempurl.com/api/Vouchers/GetbyID?id=${voucher}`
      );
      if (response.data && response.data.data != null) {
        setVoucherData(response.data);
      } else {
        toast.error("Mã giảm giá không hợp lệ");
      }
    } catch (error) {
      console.error("Error fetching voucher data", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookData = {
      timeshareId: bookData.timeshareId,
      startDay: bookData.startDay,
      endDay: bookData.endDay,
      memberId: bookData.memberId,
      deposit: bookData.deposit,
      amount: total,
      adult: bookData.adult,
      children: bookData.children,
      room: bookData.room,
      status: bookData.status,
    };

    try {
      const response = await CreateBooking(updatedBookData);
      console.log(response);
    } catch (err) {
      console.log(err);
      console.log(updatedBookData);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value });
  };

  useEffect(() => {
    let newTotal = Realestate.price;

    if (voucherData && voucherData.data) {
      if (voucherData.data.status === true) {
        toast.success("Mã giảm giá hợp lệ");
        newTotal -= (Realestate.price * voucherData.data.amount) / 100;
      } else {
        toast.error("Mã đã hết hạn");
      }
    }

    setTotal(newTotal);
  }, [voucherData, Realestate.price]);
  return (
    <>
      <Navbar />
      <section className="main-content">
        <div className="container">
          <div className="booking-form">
            <h1>Booking Request</h1>
            <form onSubmit={handleSubmit} className="booking-request-form">
              <div className="form-section">
                <p>
                  This contact information will be shared with the owner in
                  order to complete your reservation.
                </p>
                <div className="form-group">
                  <label htmlFor="adults">Adults *</label>
                  <select
                    id="adults"
                    name="adult"
                    value={bookData.adult}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">- select -</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="children">Children (under 18) *</label>
                  <select
                    id="children"
                    name="children"
                    value={bookData.children}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">- select -</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h2>Primary Guest</h2>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={bookData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Telephone *</label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={bookData.telephone}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit booking
              </button>
            </form>
          </div>
        </div>
        <div className="booking-summary">
          <img src={BASE_URL + imageReal[0]} alt={Realestate.name} />
          <h2>{Realestate.name}</h2>
          <p>{Realestate.location}</p>
          <ul>
            <li>Stay: 4 nights</li>
            <li>Total: {total}</li>
          </ul>
          <div className="form-group">
            <label htmlFor="voucher">Voucher</label>
            <input
              type="text"
              id="voucher"
              name="voucher"
              value={voucher}
              onChange={handleVoucherChange}
              required
              className="form-control"
            />
            <button
              type="button"
              onClick={handleAddVoucher}
              className="btn btn-primary"
            >
              Add Voucher
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Posting;
