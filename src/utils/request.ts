import { useConfigStore } from "@/stores/index";
import axios, { AxiosInstance, AxiosResponse } from "axios";
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

service.interceptors.response.use((response: AxiosResponse) => {
  const code = response.data.code || 200;
  if (code === 200) {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
});

export default service;
