import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API } from "@/config";

const http = axios.create({
  baseURL: API,
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    // if (window) {
    //   console.log("浏览器环境 " + `Error:  ${error.toString()}`);
    //   if (error.response?.data) {
    //     // @ts-ignore
    //     message.error(error.response.data.msg);
    //   } else {
    //     message.error(error.toString());
    //   }
    //   if (error.response?.status === 401) {
    //     // 清空用户信息
    //     useUserStore.setState((state) => {
    //       return {
    //         ...state,
    //         token: null,
    //         user: {
    //           uid: 0,
    //           username: "",
    //           avatar_url: "",
    //         },
    //       };
    //     });
    //     // 发送请求登出用户
    //     // fetch(NEXT_API + "/auth/logout", { method: "POST" });
    //   }
    // } else if (process) {
    //   console.log("node环境 " + `Error:  ${error.toString()}`);
    // }
    return Promise.reject(error);
  },
);

export default {
  get<T>(url: string, config: AxiosRequestConfig = {}): Promise<RResponse<T>> {
    return http.get(url, config);
  },
  post<T>(
    url: string,
    data = {},
    config: AxiosRequestConfig = {},
  ): Promise<RResponse<T>> {
    return http.post(url, data, config);
  },
};
