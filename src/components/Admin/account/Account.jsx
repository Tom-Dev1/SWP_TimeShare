import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import { Button } from "@mui/material";
import EditAccount from "./EditAccount";

const Account = () => {
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          "https://6535e093c620ba9358ecba91.mockapi.io/Account"
        );
        setAccount(response.data);
      } catch (error) {
        console.error("Failed to fetch account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

  const handleClickOpen = () => {
    if (account && account.length > 0) {
      setEditData({ ...account[0], id: account[0].id });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://6535e093c620ba9358ecba91.mockapi.io/Account/${editData.id}`,
        editData
      );
      setAccount(
        account.map((acc) => (acc.id === editData.id ? response.data : acc))
      );
      handleClose();
    } catch (error) {
      console.error("Failed to update account details:", error);
    }
  };

  return (
    <div>
      {account ? (
        <div className="info-account">
          <div className="title-account">Tài Khoản</div>
          {account.map((item, index) => (
            <div key={index}>
              <p className="title">Tên người dùng: {item.userName}</p>
              <p className="title">Tên: {item.name}</p>
              <p className="title">Địa chỉ email: {item.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
      <Button variant="contained" size="large" onClick={handleClickOpen}>
        Edit
      </Button>
      <EditAccount
        open={open}
        handleClose={handleClose}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Account;
