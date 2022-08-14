import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const createRequest = async (request) => {
  try {
    const response = await axiosConfig.post("/request", request);

    return response.data;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

const deleteRequest = async (id) => {
  try {
    const response = await axiosConfig.delete(`/request/${id}`);

    return response.status;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

export { createRequest, deleteRequest };
