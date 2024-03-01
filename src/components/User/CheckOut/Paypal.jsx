import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

// This value is from the props in the UI
const style = { layout: "vertical" };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, action) =>
          action.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, action) =>
          action.order.capture().then(async (response) => {
            console.log(response);
            // // if (response.status === "") {
            // //   console.log(response);
            // }
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          clientId: "test",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper currency={"USD"} amount={amount} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
