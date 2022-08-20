<template>
  <section>
    <img src="@/assets/404.svg" alt="" />
    <h1 class="mt-3">Page Not Found</h1>
    <p>The page you are looking for does not exists</p>
    <p class="text-primary mt-1" @click="goBack">
      <i class="fa-solid fa-arrow-left-long"></i>
      <span class="goback-text mx">Go Back</span>
    </p>
  </section>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: 600px;
  height: auto;
}

.goback-text {
  text-decoration-line: underline;
  text-underline-offset: 0.4em;
  cursor: pointer;
}
</style>
