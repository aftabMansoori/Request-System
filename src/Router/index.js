import VueRouter from "vue-router";

// Pages
import Login from "@/Pages/User/Login";
import Register from "@/Pages/User/Register";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "AppLogin",
      path: "/login",
      component: Login,
    },
    {
      name: "AppRegister",
      path: "/register",
      component: Register,
    },
  ],
});

export default router;
