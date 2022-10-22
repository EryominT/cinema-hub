import axios from "axios";

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorAlert?: any;
  }
}

const instance = axios.create({
  // baseURL: '/',
  timeout: 10000,
});

export function addResponseHandler (success: any, error: any) {
  instance.interceptors.response.use(success, error);
}

export default instance;
