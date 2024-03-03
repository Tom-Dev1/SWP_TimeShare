import Navbar from '../../components/navbar/Navbar';
import './posting.css';
import { BASE_URL, CreateBooking } from '../../components/API/APIConfigure';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
const Posting = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const Realestate = JSON.parse(localStorage.getItem('Realestate'));
  const imageReal = JSON.parse(localStorage.getItem('imageReal'));
  const [voucher, setVoucher] = useState('');
  const [voucherData, setVoucherData] = useState('');
  const [total, setTotal] = useState(Realestate.price);

  const [bookData, setBookData] = useState({
    phone: '',
    fullName: '',
    paymentID: '',
    timeshareId: id,
    startDay: '',
    endDay: '',
    memberId: userInfo.id,
    amount: total,
    adult: '',
    children: '',
    status: '1',
  });
  const handleVoucherChange = (event) => {
    setVoucher(event.target.value);
  };
  const handleAddVoucher = async () => {
    try {
      const response = await axios.get(
        `http://meokool-001-site1.ltempurl.com/api/Vouchers/GetbyName?name=${voucher}`
      );
      if (response.data && response.data.data != null) {
        setVoucherData(response.data);
      } else {
        toast.error('Mã giảm giá không hợp lệ');
      }
    } catch (error) {
      console.error('Error fetching voucher data', error);
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
        toast.success('Mã giảm giá hợp lệ');
        newTotal -= (Realestate.price * voucherData.data.amount) / 100;
      } else {
        toast.error('Mã đã hết hạn');
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
            <h1 className="booking-title">Đặt lịch ở đây</h1>
            <form onSubmit={handleSubmit} className="booking-request-form">
              <div className="form-section">
                <p>
                  Thông tin liên hệ này sẽ được chia sẻ với chủ sở hữu để hoàn tất việc đặt phòng
                  của bạn.
                </p>
                <div className="form-group">
                  <label htmlFor="adults">Người lớn *</label>
                  <select
                    id="adults"
                    name="adult"
                    value={bookData.adult}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">- Số người lớn -</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="children">Trẻ em (Dưới 18 tuổi) *</label>
                  <select
                    id="children"
                    name="children"
                    value={bookData.children}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">- Số trẻ em -</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="form-section">
                <h2 className="booking-title">Thông tin liên hệ của bạn </h2>
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Tên của bạn"
                    value={bookData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Số điện thoại *</label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    placeholder="Số điện thoại của bạn"
                    value={bookData.telephone}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Đặt phòng
              </button>
            </form>
          </div>
          <div className="booking-summary">
            <img src={BASE_URL + imageReal[0]} alt={Realestate.name} />
            <div className="text-summary">
              <h2>Khách sạn: {Realestate.name}</h2>
              <h2>Địa điểm: {Realestate.location}</h2>
              <h2>Ngày ở: 4 Đêm</h2>
            </div>
            <div className="_line"></div>
            <h2 className="total-summary">Tổng giá tiền: {total.toLocaleString()}VNĐ</h2>
            <div className="form-group">
              <div className="voucherLabel">
                <label htmlFor="voucher">Voucher giảm giá khi đặt phòng</label>
                <input
                  type="text"
                  id="voucher"
                  name="voucher"
                  placeholder="Áp dụng Voucher"
                  value={voucher}
                  onChange={handleVoucherChange}
                  required
                  className="form-control"
                />
                <button type="button" onClick={handleAddVoucher} className="btn btn-primary">
                  Thêm Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Posting;
