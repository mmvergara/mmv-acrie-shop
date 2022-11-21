import { AxiosResponse } from "axios";
import { authInfo } from "../types";
import { patchAvatarParams, postLoginParams, putSignupParams, standardResponse } from "./ApiTypes";
import { AxiosRequest } from "./AxiosInterceptor";

export const postLogin = async (loginData: postLoginParams) => {
  const result = (await AxiosRequest({
    method: "POST",
    url: "/auth/signin",
    data: loginData,
  })) as AxiosResponse<standardResponse<authInfo>>;
  return result.data;
};

export const putSignup = async (signupData: putSignupParams) => {
  const result = (await AxiosRequest({
    method: "PUT",
    url: "/auth/signup",
    data: signupData,
  })) as AxiosResponse<standardResponse<null>>;
  return result.data;
};
export const postLogout = async () => {
  const result = (await AxiosRequest({
    method: "POST",
    url: "/auth/signout",
  })) as AxiosResponse<standardResponse<null>>;
  return result.data;
};

export const patchUserAvatar = async (data: patchAvatarParams) => {
  const result = (await AxiosRequest({
    method: "PATCH",
    url: "/auth/changeavatar",
    data,
  })) as AxiosResponse<standardResponse<null>>;
  return result.data;
};
