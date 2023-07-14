import jwt_decode from "jwt-decode";
import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { TokenInfo } from "../types/user";

type AuthContextData = {
  user?: TokenInfo;
  setUser: (user: TokenInfo) => void;
  // todo :remove string @LuisRG30
  authTokens: any;
  setAuthTokens: any;
  registerUser: any;
  loginUser: (username: string, password: string) => Promise<void>
  loginGoogleUser: (token: string) => Promise<void>;
  logoutUser: () => void;
  ticket: string;
  setTicket: (ticket: string) => void;
};

const AuthContext = createContext({} as AuthContextData);

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;


export default AuthContext;
export const AuthProvider = ({ children }: { children: any }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens") || "{}")
        : null;
    }
  });
  const [user, setUser] = useState<TokenInfo | undefined>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authTokens")
        ? jwt_decode(localStorage.getItem("authTokens") || "{}")
        : undefined;
    }
  });
  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState("");
  const navigate = (path: string) => Router.push(path);

  const loginUser = async (username: string, password: string) => {
    const response = await fetch(`${baseURL}token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/workspace");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const loginGoogleUser = async (token: string) => {
    const response = await fetch(`${baseURL}rest-auth/google/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token: token,
      })
    });

    const data = await response.json();
    const tokens = {access: data.access_token, refresh: data.refresh_token}

    if (response.status === 200) {
      setAuthTokens(tokens);
      setUser(jwt_decode(tokens.access));
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      navigate("/workspace");
    }
  };

  const registerUser = async (username: string, firstName: string, lastName: string,  password: string, confirmPassword: string) => {
    const response = await fetch(`${baseURL}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email: username,
        name: firstName,
        surname: lastName,
        password,
        confirm_password: confirmPassword
      })
    });
    if (response.status === 201) {
      const data = await response.json();
      navigate("/");
    } else {
      const data = await response.json();
      let errors = "";
      for (const key in data) {
        errors += data[key] + "\n";
      }
      alert(errors);
    }
  };

  const logoutUser = () => {
    setAuthTokens(undefined);
    setUser(undefined);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    loginGoogleUser,
    logoutUser,
    ticket,
    setTicket,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
