import * as React from "react";
import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";

import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";

import PaymentsList from "../../components/lists/PaymentsList";

import { ProtectedRoute, AdminRoute } from "../../utils/RouteProtection";

import { PaymentType } from "../../types";
import Div100vh from "react-div-100vh";
import { Card } from "@mui/material";

const Payments: NextPageWithLayout = () => {
  ProtectedRoute();

  const { axios, initialized } = useAxios({});
  const router = useRouter();
  const { conversation } = router.query;

  const [payments, setPayments] = React.useState<PaymentType[]>([]);

  React.useEffect(() => {
    const getPayments = async () => {
      try {
        const response = await axios.get("/payments", {
          params: {
            conversation: conversation,
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (initialized) getPayments();
  }, [conversation, axios, initialized]);


  return (
    <Div100vh className={`p-2 sm:p-10 bg-slate-600`}>
      <Card
        className={`
         flex-col rounded-md flex items-center justify-start p-5 w-full h-full 
      `}
      >
        <div className={`border-b w-full items-start`}>
          <h1 className={`my-5 text-4xl font-semibold text-gray-800`}>Pagos</h1>
        </div>
        <PaymentsList payments={payments} />
      </Card>
    </Div100vh>
  );
};

export default Payments;
