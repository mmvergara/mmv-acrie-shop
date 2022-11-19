import axios, { AxiosError } from "axios";
import { API_URL } from "../Config";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const AxiosRequest = async (reqConfig: reqConfig) => {
  try {
    return await axiosClient(reqConfig);
  } catch (error) {
    const err = error as AxiosError<errResponse>;
    if (err.response) {
      toast.error(`${err.response.data.message} | ${err.response.data.statusCode}`);
      return err.response.data;
    }
    toast.error(`${err.message} | 502`);
    return { statusCode: 502, message: err.message, ok: false, data: null };
  }
};

interface reqConfig {
  method: "POST" | "GET" | "PUT" | "DELETE";
  url: string;
  data?: unknown;
}
interface errResponse {
  statusCode: number;
  message: string;
  ok: boolean;
  data: null;
}
