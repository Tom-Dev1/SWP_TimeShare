import instance from "../setUp/axios";

const SignInAccount = (queryParams) => {
    return instance.post(`api/Accounts/Signin?${queryParams}`);
};

const SignUpAccount = (userData) => {
    return instance.post(`api/Accounts/SignUpUser`, userData);
};
export { SignInAccount, SignUpAccount };
