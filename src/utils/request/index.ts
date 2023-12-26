import axios, { AxiosRequestConfig } from "axios";
import { API } from "@/config";

const http = axios.create({
  baseURL: API,
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  get<T>(url: string, config: AxiosRequestConfig={}): Promise<RResponse<T>> {
    return http.get(url, config);
  },
  post<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig={}
  ): Promise<RResponse<T>> {
    return http.post(url, data, config);
  },
};
