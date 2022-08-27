import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const getUserRequests = async (type, page, limit) => {
  try {
    const response = await axiosConfig.get(
      `/request/user-requests?` +
        new URLSearchParams({
          type,
          page,
          limit,
        })
    );

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const getSharedFiles = async () => {
  try {
    const response = await axiosConfig.get("/user/files");

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const getAllUsers = async (batch) => {
  try {
    const response = await axiosConfig.get(
      "/user/all?" +
        new URLSearchParams({
          batch,
        })
    );

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

export { getUserRequests, getSharedFiles, getAllUsers };
