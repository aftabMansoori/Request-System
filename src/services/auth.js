import config from "@/config";
import axios from "axios";
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

export { login };
