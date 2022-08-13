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
        </template>
        <template v-if="role === 'general'">
          <li
            v-for="item in userNavItems"
            :key="item.id"
            :class="setActiveTab(item.route)"
            @click="drawer()"
          >
            <router-link :to="item.route"
              ><i class="mx" :class="item.icon"></i>
              {{ item.label }}</router-link
            >
          </li>
        </template>
      </ul>
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
