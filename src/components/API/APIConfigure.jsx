import instance, { customAxios } from "../setUp/axios";

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
const CreateVouchers = (voucherData) => {
  return instance.post(`api/Vouchers/Createvoucher`, voucherData);
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
};
