<template>
  <nav>
    <div>
      <h2 class="mb-4 text-primary text-center">
        <i class="fa-solid fa-draw-polygon mx"></i> Request System
      </h2>
      <ul>
        <template v-if="role === 'admin'">
          <li
            v-for="item in adminNavItems"
            :key="item.id"
            :class="setActiveTab(item.route)"
          >
            <router-link :to="item.route"
              ><i class="mx" :class="item.icon"></i>
              {{ item.label }}</router-link
            >
          </li>
        </template>

        <template v-if="role === 'general'">
          <li
            v-for="item in userNavItems"
            :key="item.id"
            :class="setActiveTab(item.route)"
          >
            <router-link :to="item.route"
              ><i class="mx" :class="item.icon"></i>
              {{ item.label }}</router-link
            >
          </li>
        </template>
      </ul>
    </div>
    <div class="text-center">
      <h2>
        <i class="fa-solid fa-user"></i>
      </h2>
      <h3>Terry Crews</h3>
      <p class="text-secondary mb-2">terrycrews@gmail.com</p>
      <el-button plain @click="logout"
        >Logout <i class="fa-solid fa-right-from-bracket mx"></i
      ></el-button>
    </div>
  </nav>
</template>

<script>
import config from "@/config";

export default {
  name: "SideNav",
  data() {
    return {
      adminNavItems: [
        {
          id: 1,
          label: "Dashboard",
          route: "/dashboard",
          icon: "fa-solid fa-file",
        },
        {
          id: 2,
          label: "Video Requsted",
          route: "/video-requested",
          icon: "fa-solid fa-video",
        },
        {
          id: 3,
          label: "Leave Requested",
          route: "/leave-requested",
          icon: "fa-solid fa-door-open",
        },
        {
          id: 4,
          label: "Calender",
          route: "/calender",
          icon: "fa-solid fa-calendar",
        },
        {
          id: 5,
          label: "Add Admin",
          route: "/add-admin",
          icon: "fa-solid fa-user-plus",
        },
      ],
      userNavItems: [
        {
          id: 1,
          label: "Activity",
          route: "/activity",
          icon: "fa-solid fa-file",
        },
        {
          id: 2,
          label: "Create Request",
          route: "/create-request",
          icon: "fa-solid fa-video",
        },
        {
          id: 3,
          label: "Requested Videos",
          route: "/requested-videos",
          icon: "fa-solid fa-door-open",
        },
      ],
    };
  },
  computed: {
    role() {
      const role = localStorage.getItem("role");
      return role;
    },
  },
  methods: {
    setActiveTab(route) {
      return this.$route.path === route ? "active" : "";
    },
    logout() {
      this.$store.dispatch("logout");
      this.$toast.success("Logout successful", config.toastConfig);

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
nav {
  padding: 1.5em 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

ul {
  list-style: none;
  padding-inline-start: 0;
}
li {
  margin: 1em 0;
  padding: 1em 2em;
  font-weight: 600;
  color: #909399;
}
li:hover {
  color: #409eff;
  /* transform: scale(1.1); */
}

.active {
  background: #409eff;
  color: #fff;
  border-radius: 7px;
}
.active:hover {
  color: #fff;
  transform: none;
}
</style>
