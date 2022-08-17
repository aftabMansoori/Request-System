import config from "@/config";
import axios from "axios";
import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const login = async ({ email, password, role }) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/user/login`,
      { email, password, role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const register = async (user, role) => {
  try {
    const response = await axios.post(
      `${config.baseUrl}/user/register`,
      { role, ...user },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

const addAmin = async (user, role) => {
  try {
    const response = await axiosConfig.post(
      "/admin/add-admin",
      { role, ...user },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

export { login, register, addAmin };
