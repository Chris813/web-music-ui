import { useConfigStore } from "@/stores/index";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { error } from "console";

const configStore = useConfigStore();
const service: AxiosInstance = axios.create({
  baseURL: configStore.baseURL,
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// service.interceptors.response.use((response: AxiosResponse) => {
//   const code = response.data.code || 200;
//   if (code === 200) {
//     const { data } = response.data;
//     return data;
//   } else {
//     return Promise.reject(response.data);
//   }
// });

//自定义Response操作
//目前对响应数据还不是很了解，后序会加上判断status操作
const request = async (config: AxiosRequestConfig) => {
  const { data } = await service(config);
  return data;
};

export default request;
