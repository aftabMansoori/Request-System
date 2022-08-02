import VueRouter from "vue-router";

// Pages
import Login from "@/Pages/Login";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "AppLogin",
      path: "/Login",
      component: Login,
    },
  ],
});

export default router;
