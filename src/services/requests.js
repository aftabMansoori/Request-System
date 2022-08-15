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

const getRequests = async (type, batch) => {
  try {
    const response = await axiosConfig.get(
      "/request?" +
        new URLSearchParams({
          type,
          batch,
        })
    );

    return response.data;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

const manageRequest = async ({ id, type, status }) => {
  try {
    const response = await axiosConfig.patch(
      `/request/${id}?` +
        new URLSearchParams({
          type,
        }),
      { status }
    );

    return response.data;
  } catch (err) {
    console.log(err);
    errorHandler(err);
  }
};

export { createRequest, deleteRequest, getRequests, manageRequest };
