import instance, { customAxios } from "../setUp/axios";

export const BASE_URL = "http://meokool-001-site1.ltempurl.com/";

const SignInAccount = (userData) => {
  return instance.post(`api/Accounts/Signin?${userData}`);
};

const SignUpAccount = (userData) => {
  return instance.post(`api/Accounts/SignUpUser`, userData);
};
const GetAllAccounts = () => {
  return customAxios.get(`api/Accounts/GetAll`);
};

const DeleteAccount = (userID) => {
  return customAxios.delete(`api/Accounts/DeleteAccount?id=${userID}`);
};

const UpdateStatus = (userID, newStatus) => {
  return customAxios.put(`api/Accounts/UpdateAccountStatus?id=${userID}`, {
    status: newStatus,
  });
};
export const UpdateAccountByID = (userID, newUserData) => {
  return customAxios.put(`api/Accounts/UpdateAccount?id=${userID}`, {
    ...newUserData,
  });
};
export const UpdatePasswordByID = (userID, newPassword) => {
  return customAxios.put(`api/Accounts/UpdateAccount?id=${userID}`, {
    password: newPassword,
  });
};
const GetAllBookings = () => {
  return customAxios.get(`api/Bookings/GetAll`);
};
const GetAllVoucher = () => {
  return customAxios.get(`api/Vouchers/GetAll`);
};
const GetAllFeedback = () => {
  return customAxios.get(`api/Feedbacks/GetAll`);
};
const GetAllRealestates = () => {
  return customAxios.get(`api/Realestates/GetAll`);
};
const GetUserByID = (userID) => {
  return customAxios.get(`api/Accounts/GetbyID?id=${userID}`);
};
export const GetAllRealestatesByMemberID = (userID) => {
  return customAxios.get(`api/Realestates/GetbyMemberID?id=${userID}`);
};
const CreateVouchers = (voucherData) => {
  return instance.post(`api/Vouchers/Createvoucher`, voucherData);
};
export const GetbyRealestateID = (realetatesID) => {
  return customAxios.get(
    `api/Realestates/GetbyRealestateID?id=${realetatesID}`
  );
};

const CreateBooking = (data) => {
  return customAxios.post(`api/Bookings/Createbooking`, data);
};
export const UpdateRealestateStatus = (realID, newStatus) => {
  return customAxios.put(`API/Realestates/UpdateRealestateSta?id=${realID}`, {
    status: newStatus,
  });
};
export {
  SignInAccount,
  SignUpAccount,
  GetAllAccounts,
  DeleteAccount,
  UpdateStatus,
  GetAllBookings,
  GetAllVoucher,
  GetAllFeedback,
  GetUserByID,
  GetAllRealestates,
  CreateVouchers,
  CreateBooking,
};
