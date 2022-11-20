import { createContext, useContext, useMemo, useState } from "react";
import { authContext, authInfo } from "../types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<authContext | null>(null);
export const useAuth = () => useContext(AuthContext);
type props = { children: JSX.Element | JSX.Element[] };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider: any = ({ children }: props) => {
  const navigate = useNavigate();
  
  //dev
  const willLogoutInXsec = (sec: number) => console.log("Will logout in ", sec, " seconds");
  //dev

  const handleLogout = (userDidLogout = false) => {
    settingUserAuthInfo(null);
    const userInfoLS = localStorage.getItem("authInfo") || null;
    if (userInfoLS && !userDidLogout) toast.error("Session Expired, Try Logging in again.");
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
  const [userAuthInfo, settingUserAuthInfo] = useState<authInfo | null>(authInfo);
  const setUserAuthInfo = (method: "login" | "logout", data?: authInfo) => {
    if (method === "login" && data) {
      localStorage.setItem("authInfo", JSON.stringify(data));
      settingUserAuthInfo(data);
      return;
    }
    handleLogout(true);
  };
  const value = useMemo(() => ({ userAuthInfo, setUserAuthInfo }), [userAuthInfo]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
