import React from "react";
import PayPal from "./Paypal";

const Checkout = () => {
  return (
    <div className="checkout">
      <h2>Thanh toán</h2>
      <PayPal amount={2000} />
    </div>
  );
};
export default Checkout;
