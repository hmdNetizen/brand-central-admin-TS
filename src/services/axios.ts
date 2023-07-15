import axios, { AxiosError } from "axios";
import { BASE_URL } from "src/services/BASE_URL";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken");

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  // eslint-disable-next-line
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // const prevRequest = error?.config;

    if (error?.response) {
      if (error?.response?.status === 403) {
        // return `Session expired. Please login to continue`;
        error.response.statusText = "SESSION_EXPIRED";
        error.response.data = {
          message: "Session expired. Please login again ",
        };
      }
    }

    console.log(error);

    // eslint-disable-next-line
    return Promise.reject(error);
  }
);
