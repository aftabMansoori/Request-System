import config from "@/config";
import Vue from "vue";
import axios from "axios";
import { successHanlder } from "./helpers";

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

    return successHanlder(response);
  } catch (err) {
    Vue.$toast.error(err.response.data.message, config.toastConfig);
  }
};

export { login };
