import axios from "axios";
import config from "@/config";

const axiosConfig = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) config.headers["Authorization"] = token;

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosConfig;
