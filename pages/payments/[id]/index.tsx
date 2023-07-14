import * as React from "react";

import dayjs from "dayjs";

import { InferGetServerSidePropsType } from "next";
import { NextPageWithLayout } from "../../page";

import { useRouter } from "next/router";

import {
  loadStripe,
  StripeElementsOptions,
  Appearance,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "../../../components/widgets/stripe/Checkout";

import useAxios from "../../../utils/useAxios";

import { PaymentType } from "../../../types";
import Div100vh from "react-div-100vh";
import Image from "next/image";

const stripePromise = loadStripe("pk_test_51HPbh5G2PcLuT3FgFYMHXj9XKH1XeC2T1kjlI3MaI0RdOS4cNmW6sb7wfAwLkrhHUK6wRlkS9WmEJwASz4HdUBLN00wKfZ2OrW");

const IndividualPayment: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const { axios, initialized } = useAxios({});

  const [payment, setPayment] = React.useState<PaymentType>();
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    const createPaymentIntent = async () => {
      if (!id) return;
      try {
        const paymentResponse = await axios.get(`payments/${id}/`);
        console.log(paymentResponse.data)
        const response = await axios.post("create-payment-intent/", {
          payment_id: id,
        });
        setPayment(paymentResponse.data);
        setClientSecret(response.data.client_secret);
      } catch (error) {
        console.log(error);
      }
    };
    if (initialized) createPaymentIntent();
  }, [id, axios]);

  const appearance: Appearance = {
    theme: "stripe",
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Div100vh
      className={`bg-white h-screen items-center justify-center flex sm:flex-row flex-col sm:items-stretch sm:justify-stretch `}
    >
      <div
        className={`sm:basis-1/2 sm:border-r flex flex-col items-center justify-center text-start space-y-4`}
      >
        <div className={`basis-1/12`}>
          <p
            className={`
        text-5xl font-medium text-gray-900 capitalize
        `}
          >
            {payment?.description}
          </p>

          <p
            className={`
        text-3xl font-medium text-gray-700
        `}
          >
            ${payment?.amount_cents && payment.amount_cents / 100}
          </p>
        </div>
        <Image
          src={`https://res.cloudinary.com/dpgzl6cig/image/upload/v1681501313/E-Wallet-amico_qn7na6.svg`}
          alt={`payment`}
          width={300}
          height={300}
          className={`hidden sm:block`}
        />
      </div>
      <div
        className={` sm:basis-11/12  flex sm:items-center justify-center
        mt-10 sm:mt-0 sm:bg-indigo-500 sm:shadow-2xl sm:bg-opacity-50 
      `}
      >
        {clientSecret && !payment?.paid ? (
          <Elements options={options} stripe={stripePromise}>
            <Checkout />
          </Elements>
        ) :
        (
          <div className={`flex flex-col items-center justify-center space-y-4`}>
            <p
              className={`
              text-5xl font-medium text-gray-900 capitalize
              `}  
            >
              Pagado
            </p>
            <p>
              {dayjs(payment?.date_paid).format("DD/MM/YYYY")}
            </p>
          </div>
        )}
      </div>
    </Div100vh>
  );
};

export default IndividualPayment;
