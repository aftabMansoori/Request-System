<template>
  <div id="app">
    <main>
      <SideNav v-if="isAuth" />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import SideNav from "./Pages/Admin/SideNav";

export default {
  name: "App",
  components: { SideNav },
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
  grid-template-columns: 2fr 10fr;
  grid-template-rows: 1fr;
  grid-gap: 10px 10px;
  min-height: 100vh;
}
</style>
