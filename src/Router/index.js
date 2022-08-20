import VueRouter from "vue-router";

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
    meta: { authorize: ["admin"] },
  },
  {
    name: "VideoRequested",
    path: "/video-requested",
    component: VideoRequested,
    meta: { authorize: ["admin"] },
  },
  {
    name: "LeaveRequested",
    path: "/leave-requested",
    component: LeaveRequested,
    meta: { authorize: ["admin"] },
  },
  {
    name: "AddAdmin",
    path: "/add-admin",
    component: AddAdmin,
    meta: { authorize: ["admin"] },
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
    meta: { authorize: ["general"] },
  },
  {
    name: "CreateRequest",
    path: "/create-request",
    component: CreateRequest,
    meta: { authorize: ["general"] },
  },
  {
    name: "RequestedVideos",
    path: "/requested-videos",
    component: RequestedVideos,
    meta: { authorize: ["general"] },
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
  const { authorize } = to.meta;
  const currentUser = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  if (currentUser && authorize) {
    if (!authorize.includes(userRole)) {
      return next({ path: "/login" });
    }
  }
  if (currentUser && !authorize) {
    if (userRole == "admin") {
      return next({ path: "/dashboard" });
    } else {
      return next({ path: "/activity" });
    }
  }
  if (authorize && !currentUser) {
    return next({ path: "/login" });
  }
  next();
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
