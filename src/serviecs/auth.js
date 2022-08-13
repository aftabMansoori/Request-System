import "./helpers";
import axios from "axios";

const login = async ({ email, password }) => {
  console.log(process.env.VUE_APP_BASE_URL);
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
  } catch (err) {
    console.log("ERROR", err);
  }
};

export { login };
