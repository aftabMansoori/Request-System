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

export { getVideosByBatch };
