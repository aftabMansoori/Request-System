<template>
  <nav>
    <div class="my mx">
      <h2 class="text-primary">
        <i class="fa-solid fa-draw-polygon mx"></i> Request System
      </h2>

      <el-button @click="drawer()" type="primary" class="">
        <i class="fa-solid fa-bars-staggered"></i>
      </el-button>
    </div>

    <el-drawer
      title="I am the title"
      :visible.sync="showNav"
      :with-header="false"
      size="80%"
    >
      <ul class="mt-4">
        <template v-if="role === 'admin'">
          <li
            v-for="item in adminNavItems"
            :key="item.id"
            :class="setActiveTab(item.route)"
            @click="drawer()"
          >
            <router-link :to="item.route"
              ><i class="mx" :class="item.icon"></i>
              {{ item.label }}</router-link
            >
          </li>
          <li
            key="4"
            @click="drawer()"
            :class="setActiveTab('/add-admin')"
            v-if="$store.state.auth.can_create"
          >
            <router-link to="/add-admin"
              ><i class="fa-solid fa-user-plus mx"></i> Add Admin
            </router-link>
          </li>
        </template>
        <template v-if="role === 'general'">
          <li
            v-for="item in userNavItems"
            :key="item.id"
            :class="setActiveTab(item.route)"
            @click="drawer()"
          >
            <router-link :to="item.route"
              ><i :class="item.icon"></i> {{ item.label }}</router-link
            >
          </li>
        </template>
      </ul>

      <div class="text-center">
        <h2>
          <i class="fa-solid fa-user"></i>
        </h2>
        <h3>{{ name }}</h3>
        <p class="text-secondary mb-2">{{ email }}</p>
        <el-button plain @click="logout"
          >Logout <i class="fa-solid fa-right-from-bracket mx"></i
        ></el-button>
      </div>
    </el-drawer>
  </nav>
</template>

<script>
export default {
  name: "SideNavMobile",
  data() {
    return {
      showNav: false,
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
        // {
        //   id: 4,
        //   label: "Add Admin",
        //   route: "/add-admin",
        //   icon: "fa-solid fa-user-plus",
        // },
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
      name: this.$store.state.auth.name,
      role: this.$store.state.auth.role,
      email: this.$store.state.auth.email,
    };
  },
  methods: {
    drawer() {
      return (this.showNav = !this.showNav);
    },
    setActiveTab(route) {
      return this.$route.path === route ? "active" : "";
    },
    logout() {
      this.$store.dispatch("logout");
      this.$toast.success("Logout successful", this.$config.toastConfig);

      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
nav > div {
  display: flex;
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

.active {
  background: #409eff;
  color: #fff;
  border-radius: 7px;
}
</style>
