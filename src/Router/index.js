import VueRouter from "vue-router";

// User Pages
import Login from "@/Pages/User/Login";
import Register from "@/Pages/User/Register";

// Admin Pages
import AdminLogin from "@/Pages/Admin/AdminLogin";
import AdminDashboard from "@/Pages/Admin/AdminDashboard";

const AdminRoutes = [
  {
    name: "AdminLogin",
    path: "/admin/login",
    component: AdminLogin,
  },
  {
    name: "AdminDashboard",
    path: "/dashboard",
    component: AdminDashboard,
  },
];

const UserRoutes = [
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
];

const router = new VueRouter({
  mode: "history",
  routes: [...UserRoutes, ...AdminRoutes],
});

export default router;
