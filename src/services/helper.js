import Vue from "vue";
import config from "@/config";

const errorHandler = (err) => {
  console.log(err);
  Vue.$toast.error(err.response.data.message, config.toastConfig);
};

export { errorHandler };
