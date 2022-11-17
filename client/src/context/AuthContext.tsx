import { createContext, useContext, useMemo, useState } from "react";
import { authInfo, userInfo } from "../types";

export const AuthContext = createContext<authInfo | null>(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const handleLogout = () => {
    setUserAuthInfo(null);
    localStorage.removeItem("authInfo");
  };
  // Devv
  const willLogoutInXsec = (sec: number) => console.log("Will logout in ", sec, " seconds");
  // Dev

  // Get auth info
  const userInfoLS = localStorage.getItem("authInfo") || null;
  let parsedUserInfo;
  if (userInfoLS) {
    parsedUserInfo = JSON.parse(userInfoLS) as userInfo;
    const willLogoutIn = parsedUserInfo.TOKEN_EXP_DATE - new Date().getTime();
    willLogoutInXsec(willLogoutIn / 1000);
    setTimeout(() => {
      console.log("LOGEDOUT");
      handleLogout();
    }, willLogoutIn);
  } else {
    console.log("No info");
    parsedUserInfo = null;
  }

  const [userAuthInfo, setUserAuthInfo] = useState<userInfo | null>(parsedUserInfo);
  const value = useMemo(() => ({ userAuthInfo, setUserAuthInfo }), [userAuthInfo]);
  console.log(userAuthInfo);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
