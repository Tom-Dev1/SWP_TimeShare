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
    <div className="checkout">
      <h1 style={{ fontSize: '50px' }}>Thanh toán</h1>
      <img
        className="image-booking"
        src={BASE_URL + (photoUrls.length > 0 ? photoUrls[0] : '')}
        alt=""
      />
      <div className="tittle-real">
        <h1>{realestate ? realestate.name : ''}</h1>
        <h1>{realestate ? realestate.location : ''}</h1>
      </div>
      <div className="title-booking">
        <h1>Họ và tên:{booking ? booking.fullName : ''}</h1>
        <h1>Số điện thoại:{booking ? booking.phone : ''}</h1>
        <h1>Ngày checkin: {booking ? new Date(booking.startDay).toLocaleDateString() : ''}</h1>
        <h1>Ngày checkout: {booking ? new Date(booking.endDay).toLocaleDateString() : ''}</h1>
        <h1>Trạng thái: {booking ? getStatusString(booking.status) : ''}</h1>
      </div>
      {booking && booking.status !== '2' && (
        <div className="payment-booking">
          <PayPal amount={total} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
