import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

// This value is from the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
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
              purchase_units: [{ amount: { currency_code: currency, value: amount } }],
            })
            .then((orderID) => orderID)
        }
        onApprove={(data, action) =>
          action.order.capture().then(async (response) => {
            console.log(response);
            if (response.status === 'COMPLETED') {
              Swal.fire({
                title: 'Thanh toán thành công',
                text: 'Chúc bạn có kỳ nghỉ vui vẻ',
                icon: 'success',
              });
            }
            axios
              .put('your-api-url/orders/orderId', {
                status: '2',
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.error(err));
          })
        }
      />
    </>
  );
};

export default function PayPal({ amount }) {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId:
            'AcKdF_dbUAtvyM_4GmsVWZt2SQpcH2HoRiQHszUL0IFoGcAcSsjC77LUdebronMEvzr6D03gZ2v7_RaD',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  );
}
