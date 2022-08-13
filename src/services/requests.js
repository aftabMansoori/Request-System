import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const createLeaveRequest = async (request) => {
  try {
    const response = await axiosConfig.post("/request", request);

    return response.data;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

export { createLeaveRequest };
