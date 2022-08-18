import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const getUserRequests = async (type) => {
  try {
    const response = await axiosConfig.get(
      `/request/user-requests?type=${type}`
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

export { getUserRequests, getSharedFiles };
