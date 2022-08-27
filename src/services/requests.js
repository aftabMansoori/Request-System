import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const createRequest = async (request) => {
  try {
    const response = await axiosConfig.post("/request", request);

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const deleteRequest = async (id) => {
  try {
    const response = await axiosConfig.delete(`/request/${id}`);

    return response.status;
  } catch (err) {
    errorHandler(err);
  }
};

const getRequests = async (type, batch, status, page, limit) => {
  try {
    const response = await axiosConfig.get(
      "/request?" +
        new URLSearchParams({
          type,
          batch,
          status,
          page,
          limit,
        })
    );

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const manageRequest = async ({ id, type, status, video }) => {
  try {
    const response = await axiosConfig.patch(
      `/request/${id}?` +
        new URLSearchParams({
          type,
        }),
      { status, video }
    );

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

export { createRequest, deleteRequest, getRequests, manageRequest };
