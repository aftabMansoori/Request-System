import { login } from "@/services/auth";
import config from "@/config";

const auth = {
  state: {
    token: localStorage.getItem(config.KEY_TOKEN) || "",
    email: localStorage.getItem(config.KEY_EMAIL) || "",
    role: localStorage.getItem(config.KEY_ROLE) || "",
    name: localStorage.getItem(config.KEY_NAME) || "",
    can_create: localStorage.getItem(config.KEY_CAN_CREATE) || false,
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    isAdmin(state) {
      return state.role === "admin";
    },
  },
  mutations: {
    setUser(state, user) {
      state.token = user.token;
      state.email = user.email;
      state.role = user.role;
      state.name = user.name;
    },
    setCanCreate(state, canCreate) {
      state.can_create = canCreate;
    },
  },
  actions: {
    async userLogin(context, credentials) {
      const response = await login(credentials);

      const user = response.data;

      localStorage.setItem(config.KEY_TOKEN, user.token);
      localStorage.setItem(config.KEY_EMAIL, user.email);
      localStorage.setItem(config.KEY_NAME, user.name);
      localStorage.setItem(config.KEY_ROLE, user.role);
      if (user.role === "admin") {
        localStorage.setItem(config.KEY_CAN_CREATE, user.canCreate);
        context.commit("setCanCreate", user.canCreate);
      }

      context.commit("setUser", user);

      return user.name;
    },

    logout({ commit }) {
      localStorage.clear();

      commit("setUser", "");

      return "success";
    },
  },
};

export default auth;
