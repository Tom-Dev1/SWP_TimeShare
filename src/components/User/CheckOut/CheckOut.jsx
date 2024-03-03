import React, { useState, useEffect } from 'react';
import PayPal from './Paypal';
import { useParams } from 'react-router-dom';
import {
  BASE_URL,
  GetAllBookingsByID,
  GetTimeShareById,
  GetbyRealestateID,
} from '../../API/APIConfigure';
import { toast } from 'react-toastify';
import Navbar from '../../navbar/Navbar';
import MailList from '../../mailList/MailList';
import Footer from '../../footer/Footer';
import './checkout.css';
const Checkout = () => {
  const { id } = useParams();
  const [booking, setBookings] = useState();
  const [timeshare, setTimeshare] = useState();
  const [realestate, setRealestate] = useState();
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const response = await GetAllBookingsByID(id);
      setBookings(response);
      setLoading(false);
    } catch (err) {
      toast.error('Lỗi lấy thông tin Booking');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchTimeshare = async () => {
    if (!booking) return;
    try {
      const response = await GetTimeShareById(booking.timeshareId);
      setTimeshare(response);
      setLoading(false);
    } catch (err) {
      toast.error('Lỗi lấy thông tin Booking');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTimeshare();
  }, [booking]);

  const fetchyRealestate = async () => {
    if (!timeshare) return;
    try {
      const response = await GetbyRealestateID(timeshare.realestateId);
      setRealestate(response);
      setLoading(false);
    } catch (err) {
      toast.error('Lỗi lấy thông tin Booking');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchyRealestate();
  }, [timeshare]);

  if (loading) {
    return <div>Loading...</div>;
  }
  let total = Math.round(booking.amount / 24500);

  const photoUrls = realestate ? realestate.photo.split(',') : [];

  const getStatusString = (status) => {
    switch (status) {
      case '1':
        return 'Chờ thanh toán';
      case '2':
        return 'Đã thanh toán';
      case '3':
        return 'Đã hủy';
      default:
        return '';
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="main-content">
          <div className="checkoutContainer">
            <div className="checkoutCard">
              <img
                className="image-booking"
                src={BASE_URL + (photoUrls.length > 0 ? photoUrls[0] : '')}
                alt=""
              />
              <div className="tittle-real">
                <h1>Tên khách sạn: {realestate ? realestate.name : ''}</h1>
                <h1>Địa điểm: {realestate ? realestate.location : ''}</h1>
              </div>
            </div>

            {booking && booking.status !== '2' && (
              <div className="payment-container">
                <div className="paymentConfirm">
                  <div className="title-booking">
                    <h1>Xác nhận thông tin của bạn</h1>
                    <h1>Họ và tên: {booking ? booking.fullName : ''}</h1>
                    <h1>Số điện thoại: {booking ? booking.phone : ''}</h1>
                    <h1>
                      Ngày checkin: {booking ? new Date(booking.startDay).toLocaleDateString() : ''}
                    </h1>
                    <h1>
                      Ngày checkout: {booking ? new Date(booking.endDay).toLocaleDateString() : ''}
                    </h1>
                    <h1>Trạng thái: {booking ? getStatusString(booking.status) : ''}</h1>
                    <h1>Người lớn: {booking ? booking.adult : ''}</h1>
                    <h1>Trẻ em: {booking ? booking.children : ''}</h1>

                    <div className="_line"></div>
                    <h2 className="total-summary">
                      Tổng giá tiền: {booking.amount.toLocaleString()}VNĐ
                    </h2>
                  </div>
                </div>
                <div className="payment-booking">
                  <PayPal amount={total} />
                </div>
              </div>
            )}
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

export default Checkout;
