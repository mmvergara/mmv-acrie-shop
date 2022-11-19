import { AxiosRequestConfig, AxiosResponse } from "axios";
import { productDetails } from "../types";
import { putProductParams, standardResponse } from "./ApiTypes";
import { AxiosRequest } from "./AxiosInterceptor";

export const putProduct = async (newProduct: putProductParams) => {
  return await AxiosRequest({ method: "PUT", url: "/product/create", data: newProduct });
};

export const deleteProductById = async (prod_id: number) => {
  return await AxiosRequest({ method: "DELETE", url: `/product/delete/${prod_id}` });
};
export const getUserProducts = async () => {
  const result = (await AxiosRequest({
    method: "GET",
    url: `/product/userproducts`,
  })) as AxiosResponse<standardResponse<productDetails[]>>;
  return result;
};
export const getAllProducts = async () => {
  const result = (await AxiosRequest({ method: "GET", url: "/product/all" })) as AxiosResponse<
    standardResponse<productDetails[]>
  >;
  return result.data;
};

export const getSingleProductById = async (prod_id: number) => {
  const result = (await AxiosRequest({
    method: "GET",
    url: `/product/details/${prod_id}`,
  })) as AxiosResponse<standardResponse<productDetails>>;
  return result.data
};
