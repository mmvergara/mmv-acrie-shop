import { createContext, useContext, useMemo, useState } from "react";
import { authContext, authInfo } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<authContext | null>(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const navigate = useNavigate();
  const willLogoutInXsec = (sec: number) => console.log("Will logout in ", sec, " seconds");

  const handleLogout = () => {
    setUserAuthInfo(null);
    const userInfoLS = localStorage.getItem("authInfo") || null;
    if (userInfoLS) {
      toast.error("Session Expired, Try Logging in again.");
    }
    localStorage.removeItem("authInfo");
    navigate("/");
  };

  // Get auth info
  let authInfo = null;
  const jsonAuthInfo = localStorage.getItem("authInfo");
  if (jsonAuthInfo) {
    authInfo = JSON.parse(jsonAuthInfo) as authInfo;
    if (!authInfo) return;

    const secondsTillLogout = authInfo.TOKEN_EXP_DATE - new Date().getTime();
    willLogoutInXsec(secondsTillLogout / 1000);

    setTimeout(() => {
      handleLogout();
    }, secondsTillLogout);
  }

  // Set auth Info
  const [userAuthInfo, setUserAuthInfo] = useState<authInfo | null>(authInfo);
  const value = useMemo(() => ({ userAuthInfo, setUserAuthInfo }), [userAuthInfo]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
