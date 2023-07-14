import * as React from 'react';
import { NextPageWithLayout } from '../page';

import { useRouter } from 'next/router';

import { ProtectedRoute } from '../../utils/RouteProtection';

import SpinnerCheckmark from "../../components/displays/SpinnerArrow";
import SpinnerEx from '../../components/displays/SpinnerEx';
import Div100vh from "react-div-100vh";

const PaymentReturn: NextPageWithLayout = () => {
    ProtectedRoute();

    const router = useRouter();
    const { redirect_status } = router.query;

    const handleClick = () => {
        router.push("/workspace");
    };

    return (
        <Div100vh className="p-10">
      <div
        className={`border-4 border-dashed flex-col rounded-md  flex items-center justify-center p-5 w-full h-full`}
      >
        {
            redirect_status === "succeeded" ? (
                <div>
                    <SpinnerCheckmark />
                    <h1 className={`my-5 text-4xl font-semibold text-gray-800`}>
                    ¡Excelente!
                    </h1>
                    <p className={`text-gray-600 text-lg text-center`}>
                    Tu pago fue recibido con éxito. Puede ser que tarde unos minutos en ser reflejado en tu cuenta.
                    </p>
                    <p className={`text-gray-600 text-lg text-center`}>
                        Apreciamos ampliamente tu preferencia.
                    </p>
                </div>
            ) : (
                <div>
                    <SpinnerEx />
                    <h1 className={`my-5 text-4xl font-semibold text-gray-800`}>
                        ¡Ups!
                    </h1>
                    <p className={`text-gray-600 text-lg text-center`}>
                        Tu pago no pudo ser procesado. Por favor, intenta de nuevo más tarde.
                    </p>
                    <p className={`text-gray-600 text-lg text-center`}>
                        Si el problema persiste, por favor, comunícate con nosotros.
                    </p>
                </div>
            )
        }
        <button
          onClick={handleClick}
          className={`bg-indigo-400 hover:bg-indigo-500 hover:scale-110 active:bg-indigo-600  text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-10`}
        >
            IR A MI ESPACIO DE TRABAJO
        </button>
      </div>
    </Div100vh>
    );
};

export default PaymentReturn;  