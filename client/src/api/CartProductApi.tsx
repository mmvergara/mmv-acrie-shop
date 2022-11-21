import { AxiosResponse } from "axios";
import { cartproductDetails } from "../types";
import { checkoutDetails, standardResponse } from "./ApiTypes";
import { AxiosRequest } from "./AxiosInterceptor";

export const putProducttoCart = async (prodId: number) => {
  const result = await AxiosRequest({ method: "PUT", url: `/cartproduct/add?prod_id=${prodId}` });
  return result;
};

export const postCheckout = async () => {
  const result = (await AxiosRequest({
    method: "POST",
    url: "/cartproduct/checkout",
  })) as AxiosResponse<standardResponse<checkoutDetails>>;
  return result.data;
};

export const deleteCartItem = async (cartId: number) => {
  const result = await AxiosRequest({
    method: "DELETE",
    url: `/cartproduct/delete?cart_id=${cartId}`,
  });
  return result;
};

export const delDecreaseProducttoCart = async (cartId: number) => {
  const result = await AxiosRequest({
    method: "DELETE",
    url: `/cartproduct/decrease?cart_id=${cartId}`,
  });
  return result;
};

export const getUserCartProducts = async () => {
  const result = (await AxiosRequest({ method: "GET", url: "/cartproduct/all" })) as AxiosResponse<
    standardResponse<cartproductDetails[]>
  >;
  return result.data;
};
