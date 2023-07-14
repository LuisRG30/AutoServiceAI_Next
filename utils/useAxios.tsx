import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { config } from "process";
import { request } from "http";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const useAxios = (config = {}) => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);

    const [initialized, setInitialized] = useState(false);
    const [axiosInstance, setAxiosInstance] = useState({} as any);
  
    useEffect(() => {
      if (!authTokens) {
        setInitialized(false);
        return;
      } else {
        const instance = axios.create({
          ...config,
          baseURL,
          headers: { Authorization: `Bearer ${authTokens.access}` }
        });

        instance.interceptors.request.use(async (request: any) => {
          const user = jwt_decode(authTokens.access);
          const isExpired = dayjs.unix((user as any).exp).diff(dayjs()) < 1;
          if (!isExpired) return request;

          try {
            const response = await axios.post(`${baseURL}token/refresh/`, {
              refresh: authTokens.refresh
            });
            localStorage.setItem("authTokens", JSON.stringify(response.data));
      
            if (response.data) {
              setAuthTokens(response.data);
              if (response.data.access) {
                setUser(jwt_decode(response.data.access));
                (request as any).headers.Authorization = `Bearer ${response.data.access}`;
                return request;
              }
            }
            throw new Error("Error refreshing token");
            }
          catch (e: any) {
            //Check if refresh token is expired
            if (e.response.status === 401) {
              const refreshToken = jwt_decode(authTokens.refresh);
              const isRefreshExpired = dayjs.unix((refreshToken as any).exp).diff(dayjs()) < 1;
              if (isRefreshExpired) {
                logoutUser();
              } 
            }
          } 

          return request;
        });

        setAxiosInstance({instance});
        setInitialized(true);
      }
      return () => {
        setInitialized(false);
        setAxiosInstance({} as any);
      };

    }, [authTokens]);

    return { axios: axiosInstance.instance , initialized };
  };
  
  export default useAxios;