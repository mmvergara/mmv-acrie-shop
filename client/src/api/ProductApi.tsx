import { AxiosResponse } from "axios";
import { productDetails } from "../types";
import { putProductParams, standardResponse } from "./ApiTypes";
import { AxiosRequest } from "./AxiosInterceptor";

export const putProduct = async (newProduct: putProductParams) => {
  const result = await AxiosRequest({ method: "PUT", url: "/product/create", data: newProduct });
  console.log(result);
};
export const deleteProductById = async (prod_id: number) => {
  const result = await AxiosRequest({ method: "DELETE", url: `/product/delete/${prod_id}` });
  console.log(result);
  return result;
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
  console.log(result);
  return result.data;
};
