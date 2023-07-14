import * as React from "react";
import { NextPageWithLayout } from "../page";

import useAxios from "../../utils/useAxios";
import Div100vh from "react-div-100vh";
import NoChats from "../../components/svgs/NoChats";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const Verify: NextPageWithLayout = () => {
  const { axios, initialized } = useAxios({});

  const resendActivationEmail = async () => {
    try {
      await axios.post(`${baseURL}users/resend-activation-email/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Div100vh className="p-10">
      <div
        className={`border-4 border-dashed flex-col rounded-md  flex items-center justify-center p-5 w-full h-full`}
      >
        <Image
          src={`https://res.cloudinary.com/dpgzl6cig/image/upload/v1681335419/undraw_Mailbox_re_dvds_uwv0tr.png`}
          alt={`check_email`}
          width={300}
          height={300}
        />
        <h1 className={`font-semibold text-5xl text-gray-800 mb-2`}>
          Verifica tu cuenta
        </h1>
        <p
          className={`
            text-gray-600
            text-lg
            text-center
            mb-5
            
        `}
        >
          Revisa tu correo y da click en la liga de verificación.
        </p>
        <button
          className={`bg-indigo-400 hover:bg-indigo-500 hover:scale-110 active:bg-indigo-600  text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-10`}
          onClick={resendActivationEmail}
        >
          REENVIAR CORREO
        </button>
      </div>
    </Div100vh>
  );
};

export default Verify;
