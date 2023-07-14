import * as React from "react";
import { NextPageWithLayout } from "../../../page";
import { useRouter } from "next/router";
import SpinnerArrow from "../../../../components/displays/SpinnerArrow";
import CardPaymentAnim from "../../../../components/displays/SpinnerArrow";
import SpinnerCheckmark from "../../../../components/displays/SpinnerArrow";
import Div100vh from "react-div-100vh";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const Verify: NextPageWithLayout = () => {
  const router = useRouter();
  const { uid, token } = router.query;

  React.useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          `${baseURL}users/activate-account/${uid}/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //Verification success. Redirect to login page.
      } catch (error) {
        console.log(error);
      }
    };
    verify();
  }, [uid, token]);

  // todo: signout user and redirect to login page
  const handleClick = () => {
    router.push("/login");
  };

  return (
    <Div100vh className="p-10">
      <div
        className={`border-4 border-dashed flex-col rounded-md  flex items-center justify-center p-5 w-full h-full`}
      >
        <SpinnerCheckmark />
        <h1 className={`my-5 text-4xl font-semibold text-gray-800`}>
          Felicidades!
        </h1>
        <p className={`text-gray-600 text-lg text-center`}>
          Tu cuenta ha sido verificada con éxito.
        </p>
        <p className={`text-gray-600 text-lg text-center`}>
          Por tu seguridad, deberas iniciar sesión nuevamente.
        </p>
        <button
          onClick={handleClick}
          className={`bg-indigo-400 hover:bg-indigo-500 hover:scale-110 active:bg-indigo-600  text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 mt-10`}
        >
          INICIAR SESIÓN
        </button>
      </div>
    </Div100vh>
  );
};

export default Verify;
