import * as React from "react";
import { NextPageWithLayout } from "../../../page";

import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";
import { Card } from "@mui/material";

const PasswordReset: NextPageWithLayout = () => {
  const router = useRouter();
  const { uid, token } = router.query;

  const [password, setPassword] = React.useState<string>("");
  const [password2, setPassword2] = React.useState<string>("");

  const [loading, setLoading] = React.useState<boolean>(false);

  const handlePasswordReset = async () => {
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}users/password-reset/${uid}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            password2,
          }),
        }
      );
      setLoading(false);
      if (response.status === 200) {
        alert("Contraseña reestablecida con éxito");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        alert("Ha ocurrido un error. Inténtalo con una liga nueva.");
      }
    } catch (error) {
      alert("Ha ocurrido un error");
    }
  };

  // create a disable state for the button if the passwords don't match, or if the passwords are empty or if the passwords are too short (less than 8 characters) o
  const disableButton = () => {
    if (password !== password2) {
      return true;
    }
    if (password === "" || password2 === "") {
      return true;
    }
    if (password.length < 8 || password2.length < 8) {
      return true;
    }
    return false;
  };

  return (
    <Div100vh className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 flex items-center justify-center">
      <span className=" whitespace-nowrap text-blue-600 absolute top-2 left-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
          preserveAspectRatio="none"
        >
          <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
        </svg>
        <span className="font-geomanist relative text-lg text-white">
          Firmala
        </span>
      </span>

      <Card
        className={`p-5`}
        style={{
          boxShadow: "0 0 100px 0 rgba(0,0,0,0.5)",
        }}
      >
        <h1
          className={`mb-3 font-medium text-xl leading-5 text-gray-900 text-center`}
        >
          Reestablece tu contraseña
        </h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="flex flex-col items-center justify-center  py-2">
            <div className="flex flex-col items-center space-y-1.5 justify-center">
              <input
                className={`border-gray-300 shadow  w-full text-center rounded-md p-2`}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={`border-gray-300 shadow  w-full text-center rounded-md p-2`}
                type="password"
                placeholder="Repite la contraseña"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <button
              disabled={disableButton()}
              className={` mt-4 bg-blue-600 text-white p-2 rounded-md px-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-350`}
              onClick={handlePasswordReset}
            >
              Enviar
            </button>
          </div>
        )}
      </Card>
    </Div100vh>
  );
};

export default PasswordReset;
