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
      <span>Hi there!</span>
    </el-drawer>
  </nav>
</template>

<script>
export default {
  name: "SideNavMobile",
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    drawer() {
      return (this.showNav = !this.showNav);
    },
  },
};
</script>

<style scoped>
nav > div {
  display: flex;
  justify-content: space-between;
}
</style>
