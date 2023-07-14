import * as React from "react";
import { NextPageWithLayout } from "../page";
import { useRouter } from "next/router";

import SpinnerCheckmark from "../../components/displays/SpinnerArrow";
import Div100vh from "react-div-100vh";

import { ProtectedRoute } from "../../utils/RouteProtection";

import UserContext from "../../context/UserContext";

const OnboardingReturn: NextPageWithLayout = () => {
    const { profile, setProfile } = React.useContext(UserContext);

    const router = useRouter();

    const handleClick = () => {
        setProfile({ ...profile, onboarded: true });
        router.push("/workspace");
    };

    ProtectedRoute();

    return (
        <Div100vh className="p-10">
        <div
            className={`border-4 border-dashed flex-col rounded-md  flex items-center justify-center p-5 w-full h-full`}
        >
            <SpinnerCheckmark />
            <h1 className={`my-5 text-4xl font-semibold text-gray-800`}>
            ¡Éxito!
            </h1>
            <p className={`text-gray-600 text-lg text-center`}>
            Hemos guardado tus preferencias.
            </p>
            <p className={`text-gray-600 text-lg text-center`}>
            Iniciaremos una conversación con nuestro equipo para atender tu caso. Puedes dejarnos mensajes en el chat, así como documentos que consideres importantes para tu caso.
            </p>
            <button
            onClick={handleClick}
            className={`bg-indigo-400 hover:bg-indigo-500 hover:scale-110 active:bg-indigo-600  text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-10`}
            >
            IR A MI ESPACIO DE TRABAJO
            </button>
        </div>
        </Div100vh>
    )

}

export default OnboardingReturn;
