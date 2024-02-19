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
    return customAxios.put(`api/Accounts/UpdateAccountStatus?id=${userID}`, { status: newStatus });
};
export { SignInAccount, SignUpAccount, GetAllAccounts, DeleteAccount, UpdateStatus };
