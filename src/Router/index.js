import VueRouter from "vue-router";

// User Pages
import Login from "@/Pages/User/Login";
import Register from "@/Pages/User/Register";

// Admin Pages
import AdminLogin from "@/Pages/Admin/AdminLogin";
import AdminDashboard from "@/Pages/Admin/AdminDashboard";
import VideoRequested from "@/Pages/Admin/VideoRequested";
import LeaveRequested from "@/Pages/Admin/LeaveRequested";
import AdminCalender from "@/Pages/Admin/AdminCalender";
import AddAdmin from "@/Pages/Admin/AddAdmin";

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
  {
    name: "VideoRequested",
    path: "/video-requested",
    component: VideoRequested,
  },
  {
    name: "LeaveRequested",
    path: "/leave-requested",
    component: LeaveRequested,
  },
  {
    name: "AdminCalender",
    path: "/calender",
    component: AdminCalender,
  },
  {
    name: "AddAdmin",
    path: "/add-admin",
    component: AddAdmin,
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
