<template>
  <section>
    <h1 class="text-primary mb-none">User Activity</h1>
    <small class="text-secondary"
      >Requests for Video and Leave can be made here</small
    >
  </section>
</template>

<script>
export default {
  name: "UserActivity",
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

@media (max-width: 768px) {
  section {
    padding: 1em;
    overflow: auto;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }
}
</style>
