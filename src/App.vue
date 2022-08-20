<template>
  <div id="app">
    <main class="" v-if="!skipRoutes.includes($route.path) && isAuth">
      <SideNavDesktop class="d-sm-none" />
      <SideNavMobile class="d-lg-none" />
      <div class="view-wrapper">
        <router-view :key="$route.path"></router-view>
      </div>
    </main>
    <template v-else><router-view></router-view></template>
  </div>
</template>

<script>
import SideNavDesktop from "@/Components/SideNavDesktop";
import SideNavMobile from "@/Components/SideNavMobile";

export default {
  name: "App",
  components: { SideNavDesktop, SideNavMobile },
  data() {
    return {
      isAuth: this.$store.getters.isAuthenticated,
      skipRoutes: ["/", "/login", "/register", "/admin/login"],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  display: grid;
  grid-template-columns: 2fr 9fr;
  grid-template-rows: 1fr;
  grid-gap: 10px 10px;
  min-height: 100vh;
  overflow: auto;
}

.view-wrapper {
  height: 100vh;
  width: 100%;
  overflow: auto;
}

@media (max-width: 1200px) {
  main {
    display: grid;
    grid-template-columns: 3fr 8fr;
    grid-template-rows: 1fr;
  }
}

@media (max-width: 768px) {
  main {
    display: block;
    min-height: 100%;
  }
}
</style>
