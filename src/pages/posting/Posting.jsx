import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./posting.css";
import { CreateBooking } from "../../components/API/APIConfigure";
import { useState } from "react";
import { useParams } from "react-router";
import { string } from "prop-types";
import { TextField } from "@mui/material";
const Posting = () => {
    const { id } = useParams();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [bookData, setBookData] = useState({
        timeshareId: id,
        startDay: "",
        endDay: "",
        memberId: userInfo.id,
        deposit: 0,
        amount: 0,
        adult: 0, // Sửa giá trị mặc định của adult thành 0
        children: 0,

        room: 0,
        status: "1",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            timeshareId: bookData.timeshareId,
            startDay: bookData.startDay,
            endDay: bookData.endDay,
            memberId: bookData.memberId,
            deposit: bookData.deposit,
            amount: bookData.amount,
            adult: bookData.adult,
            children: bookData.children,
            room: bookData.room,
            status: bookData.status,
        };
        // console.log(data);

        try {
            const response = await CreateBooking(data);

            console.log(response);
            // if (response === null) {
            //     console.log("failed to create");
            // } else {
            //     console.log("success");
            // }
        } catch (err) {
            console.log(err);
            console.log(err.config.data);
        }
    };
    return (
        <>
            <Navbar />
            <section className="main-content">
                <div className="row">
                    <div className="small-12 columns main-well main-well-large">
                        <div className="columns-wrapper row">
                            <div className="inquiry-sidebar columns small-12 medium-push-8 medium-4">
                                <div className="sidebar-wrapper">
                                    <div className="featured-posting"></div>
                                    <div className="user-info"></div>
                                </div>
                            </div>
                            <div className="columns small-12 medium-pull-4 medium-8">
                                <div>
                                    <div className="columns small-12 no-padding-left no-padding-right">
                                        <form onSubmit={handleSubmit} action="">
                                            <div>
                                                <h1 className="bold hide-for-small-only">Booking Request</h1>
                                                <div className="content-container">
                                                    <div>
                                                        <p className="title-p">
                                                            This contact information will be shared with the owner in
                                                            order to complete your reservation.
                                                        </p>
                                                        <div className="row guest-count">
                                                            <div className="columns small-12 medium-6 large-3">
                                                                <label className="number-people">Số Người</label>
                                                                <select
                                                                    id="adult"
                                                                    className="user-success rw-user-success"
                                                                    value={bookData.adult}
                                                                    onChange={(e) =>
                                                                        setBookData({
                                                                            ...bookData,
                                                                            adult: parseInt(e.target.value), // chuyển đổi giá trị sang số
                                                                        })
                                                                    }
                                                                >
                                                                    <option value="">-select-</option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </select>
                                                            </div>
                                                            <div className="columns small-12 medium-6 ">
                                                                {/* <label>Check-in Date</label> */}
                                                                {/* <input
                                                                    type="date"
                                                                    name="checkinDate"
                                                                    value={bookData.startDay}
                                                                    onChange={(e) =>
                                                                        setBookData({
                                                                            ...bookData,
                                                                            startDay: e.target.value,
                                                                        })
                                                                    }
                                                                /> */}
                                                                <TextField
                                                                    name="startDay"
                                                                    label="Ngày bắt đầu"
                                                                    type="date"
                                                                    value={bookData.startDay}
                                                                    onChange={(e) =>
                                                                        setBookData({
                                                                            ...bookData,
                                                                            startDay: e.target.value,
                                                                        })
                                                                    }
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="columns small-12 medium-6 ">
                                                                {/* <label>Check-out Date</label> */}
                                                                {/* <input
                                                                    type="date"
                                                                    name="checkoutDate"
                                                                    value={bookData.endDay}
                                                                    onChange={(e) =>
                                                                        setBookData({
                                                                            ...bookData,
                                                                            endDay: e.target.value,
                                                                        })
                                                                    }
                                                                /> */}
                                                                <TextField
                                                                    name="endDay"
                                                                    label="Ngày kết thúc"
                                                                    type="date"
                                                                    value={bookData.endDay}
                                                                    onChange={(e) =>
                                                                        setBookData({
                                                                            ...bookData,
                                                                            endDay: e.target.value,
                                                                        })
                                                                    }
                                                                    required
                                                                    InputLabelProps={{
                                                                        shrink: true,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <h2 className="guest-primary">Primary Guest</h2>
                                                        <div>
                                                            <label>Full Name</label>
                                                            <input
                                                                type="text"
                                                                value="Full Name"
                                                                onChange={(e) => e.target.value}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label>Địa chỉ</label>
                                                            <input
                                                                type="text"
                                                                value="address"
                                                                onChange={(e) =>
                                                                    setBookData({
                                                                        ...bookData,
                                                                        address: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <label>Số Điện Thoại</label>
                                                            <input
                                                                type="text"
                                                                value="sdt"
                                                                onChange={(e) => e.target.value}
                                                            />
                                                        </div>
                                                    </div>
                                                    <button className="btn-submit">Submit booking</button>
                                                </div>
                                                <div className="payment-info content-container">
                                                    <div className="ant-card-head">
                                                        <div className="ant-card-head-wrapper">
                                                            <div className="ant-card-head-title">
                                                                <h2 className="guest-primary">
                                                                    Phương thức thanh toán
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Posting;
