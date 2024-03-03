import Navbar from '../../components/navbar/Navbar';
import './posting.css';
import { BASE_URL, CreateBooking } from '../../components/API/APIConfigure';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';
const Posting = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const Realestate = JSON.parse(localStorage.getItem('Realestate'));
  const imageReal = JSON.parse(localStorage.getItem('imageReal'));
  const [voucher, setVoucher] = useState('');
  const [voucherData, setVoucherData] = useState('');
  const navigate = useNavigate();
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
      phone: bookData.phone,
      fullName: bookData.fullName,
      timeshareId: bookData.timeshareId,
      startDay: bookData.startDay,
      endDay: bookData.endDay,
      amount: total,
      memberId: bookData.memberId,
      adult: bookData.adult,
      children: bookData.children,
      status: bookData.status,
    };

    try {
      const response = await CreateBooking(updatedBookData);
      Swal.fire({
        icon: 'success',
        title: 'Đặt chỗ thành công',
      }).then(() => {
        navigate(`/user/checkout/${response.id}`);
      });
    } catch (err) {
      console.log(err);
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
      <div className="main-content">
        <div className="posting_container">
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
                    <option className="from-group-option" value="">
                      - Số người lớn -
                    </option>

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
                    <option className="from-group-option" value="">
                      - Số trẻ em -
                    </option>

                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
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
                  <label htmlFor="telephone">Số Điện Thoại *</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={bookData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group-div-date">
                  <div className="form-group-date">
                    <label htmlFor="telephone">Ngày bắt đầu: </label>
                    <input
                      type="date"
                      id="startDay"
                      name="startDay"
                      value={bookData.startDay}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group-date">
                    <label htmlFor="telephone">Ngày kết thúc: </label>
                    <input
                      type="date"
                      id="endDay"
                      name="endDay"
                      value={bookData.endDay}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    />
                  </div>
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
                  placeholder="Voucher của bạn"
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
      </div>
      <div className="homeContainer">
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Posting;
