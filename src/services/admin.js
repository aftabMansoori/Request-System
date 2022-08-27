import axiosConfig from "@/axiosConfig/axiosConfig";
import { errorHandler } from "./helper";

const getVideosByBatch = async (batch, day) => {
  try {
    const response = await axiosConfig.get(
      "/admin/get-files?" +
        new URLSearchParams({
          batch,
          day,
        })
    );

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const getStats = async () => {
  try {
    const response = await axiosConfig.get("/admin/stats");

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const getAllAdmin = async () => {
  try {
    const response = await axiosConfig.get("/admin/all-admins");

    return response.data;
  } catch (err) {
    errorHandler(err);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axiosConfig.delete(`/admin/${id}`);

    return response.status;
  } catch (err) {
    errorHandler(err);
  }
};

const deleteAdmim = async (id) => {
  try {
    const response = await axiosConfig.delete(`/admin/${id}/admin`);

    return response.status;
  } catch (err) {
    errorHandler(err);
  }
};

export { getVideosByBatch, getStats, getAllAdmin, deleteUser, deleteAdmim };
