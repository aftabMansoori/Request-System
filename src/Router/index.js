import VueRouter from "vue-router";
// import store from "@/store";

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
import AdminCalender from "@/Pages/Admin/AdminCalender";
import AddAdmin from "@/Pages/Admin/AddAdmin";
import store from "@/store";

const meta = {
  authorize: "general",
};

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
  {
    name: "UserActivity",
    path: "/activity",
    component: UserActivity,
    meta,
  },
  {
    name: "CreateRequest",
    path: "/create-request",
    component: CreateRequest,
    meta,
  },
  {
    name: "RequestedVideos",
    path: "/requested-videos",
    component: RequestedVideos,
    meta,
  },
];

const router = new VueRouter({
  mode: "history",
  routes: [...UserRoutes, ...AdminRoutes],
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  // const role = localStorage.getItem("role");

  if (authorize) {
    if (!store.getters.isAuthenticated) next({ path: "/login" });
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
