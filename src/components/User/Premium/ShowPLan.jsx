import React, { useState } from "react";
import PaypalPre from "./PaypalPre";

const ShowPlan = () => {
  const premiumPlan = {
    id: 1,
    price: 120000,
    fee: (120000 / 100) * 8.4,
  };

  return (
    <div>
      <ul>
        <li key={premiumPlan.id}>
          <h3>Gói thành viên 1 tháng</h3>
          <p>Giá :{premiumPlan.price.toLocaleString()}</p>
          <p>
            Phí giao dịch: {Math.round(premiumPlan.fee).toLocaleString()}
            VNĐ
          </p>
          <p>
            Tổng cộng:{" "}
            {Math.round(premiumPlan.price + premiumPlan.fee).toLocaleString()}
            VNĐ
          </p>
        </li>
      </ul>
      <PaypalPre
        amount={Math.round((premiumPlan.price + premiumPlan.fee) / 24500)}
      />
    </div>
  );
};

export default ShowPlan;
