import { login } from "@/serviecs/auth";

const auth = {
  state: {
    token: localStorage.getItem(process.env.KEY_TOKEN) || "",
    email: localStorage.getItem(process.env.KEY_EMAIL) || "",
    role: localStorage.getItem(process.env.KEY_ROLE) || "",
  },
  actions: {
    async userLogin(context, credentials) {
      await login(credentials);
    },
  },
};

export default auth;
