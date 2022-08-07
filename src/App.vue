<template>
  <div id="app">
    <main class="">
      <SideNavDesktop class="d-sm-none" v-if="isAuth" />
      <SideNavMobile class="d-lg-none" v-if="isAuth" />
      <div class="view-wrapper">
        <router-view></router-view>
      </div>
    </main>
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
      isAuth: !!localStorage.getItem("role"),
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
