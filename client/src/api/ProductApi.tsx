import { AxiosResponse } from "axios";
import { productDetails } from "../types";
import { putProductParams, standardResponse } from "./ApiTypes";
import { AxiosRequest } from "./AxiosInterceptor";

export const putProduct = async (newProduct: putProductParams) => {
  const result = await AxiosRequest({ method: "PUT", url: "/product/create", data: newProduct });
  console.log(result);
};
export const getAllProducts = async () => {
  const result = (await AxiosRequest({ method: "GET", url: "/product/all" })) as AxiosResponse<
    standardResponse<productDetails[]>
  >;
  console.log(result);
  return result.data;
};
