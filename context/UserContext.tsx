import useAxios from "../utils/useAxios";
import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

import { Profile } from "../types/user";


type UserContextData = {
    userinfo: any;
    setUserinfo: any;
    profile: Profile;
    setProfile: (profile: Profile) => void;
}

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;


const UserContext = createContext({} as UserContextData);

export default UserContext;

export const UserProvider = ({ children }: {children: any}) => {
    const { user } = useContext(AuthContext);
    const [userinfo, setUserinfo] = useState(() =>
      localStorage.getItem("userinfo")
        ? JSON.parse(localStorage.getItem("userinfo") || '{}')
        : null
    );
    const [profile, setProfile] = useState(() =>
      localStorage.getItem("profile")
        ? JSON.parse(localStorage.getItem("profile") || '{}')
        : null
    );
    const { axios, initialized } = useAxios({});
    useEffect(() => {
        const getUserinfo = async () => {
            try {
                const response = await axios.get("/user");
                setUserinfo(response.data);
            } catch {
                console.log("User not found");
            }
            
        }
        const getProfile = async () => {
            try {
                const response = await axios.get("/profile");
                setProfile(response.data);
            } catch {
                console.log("Profile not found");
            }
        }
        if (user && initialized) {
            getUserinfo();
            getProfile();
        }
        return () => {
            setUserinfo(null);
            setProfile(null);
        }

    }, [user]);

    return (
        <UserContext.Provider value={{userinfo, setUserinfo, profile, setProfile}}>
            {children}
        </UserContext.Provider>
    );
}