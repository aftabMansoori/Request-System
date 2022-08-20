import VueRouter from "vue-router";
import store from "@/store";

// User Pages
import Login from "@/Pages/User/Login";
import Register from "@/Pages/User/Register";
import UserActivity from "@/Pages/User/UserActivity";
import CreateRequest from "@/Pages/User/CreateRequest";
import RequestedVideos from "@/Pages/User/RequestedVideos";

// Admin Pages
import AdminLogin from "@/Pages/Admin/AdminLogin";
import AdminDashboard from "@/Pages/Admin/AdminDashboard";
import VideoRequested from "@/Pages/Admin/VideoRequested";
import LeaveRequested from "@/Pages/Admin/LeaveRequested";
import AddAdmin from "@/Pages/Admin/AddAdmin";

import PageNotFound from "@/Pages/PageNotFound";

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
    meta: ["admin"],
  },
  {
    name: "VideoRequested",
    path: "/video-requested",
    component: VideoRequested,
    meta: ["admin"],
  },
  {
    name: "LeaveRequested",
    path: "/leave-requested",
    component: LeaveRequested,
    meta: ["admin"],
  },
  {
    name: "AddAdmin",
    path: "/add-admin",
    component: AddAdmin,
    meta: ["admin"],
  },
];

const UserRoutes = [
  {
    name: "AppLogin",
    path: "/login",
    component: Login,
  },
  {
    name: "AppHome",
    path: "/",
    component: Login,
  },
  {
    name: "AppRegister",
    path: "/register",
    component: Register,
  },
  {
    name: "UserActivity",
    path: "/activity",
    component: UserActivity,
    meta: ["general"],
  },
  {
    name: "CreateRequest",
    path: "/create-request",
    component: CreateRequest,
    meta: ["general"],
  },
  {
    name: "RequestedVideos",
    path: "/requested-videos",
    component: RequestedVideos,
    meta: ["general"],
  },
];

const router = new VueRouter({
  mode: "history",
  routes: [
    ...UserRoutes,
    ...AdminRoutes,
    { path: "*", component: PageNotFound },
  ],
});

router.beforeEach((to, from, next) => {
  const authorize = to.meta;

  if (!authorize && !store.getters.isAuthenticated) next({ path: "/login" });
  else next();
});

// if (to.matched.some((record) => record.meta.requiresAuth)) {
//   if (localStorage.getItem("jwt") == null) {
//     next({
//       path: "/login",
//       params: { nextUrl: to.fullPath },
//     });
//   } else {
//     let user = JSON.parse(localStorage.getItem("user"));
// if (to.matched.some((record) => record.meta.is_admin)) {
//   if (user.is_admin == 1) {
//     next();
//   } else {
//     next({ name: "userboard" });
//   }
// } else {
//   next();
// }
//   }
// } else {
//   next();
// }

export default router;
