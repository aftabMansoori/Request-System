import Vue from "vue";
import config from "@/config";

const errorHandler = (err) => {
  Vue.$toast.error(
    err.response.data.message,
    config.toastConfig || "There was some error while making request"
  );
};

export { errorHandler };
