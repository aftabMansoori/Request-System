<template>
  <section>
    <h1 class="text-primary mb-none">User Activity</h1>
    <small class="text-secondary"
      >All the requests and their status will be available</small
    >

    <div class="mt-4">
      <div>
        <ActivityTable />
      </div>
    </div>
  </section>
</template>

<script>
import ActivityTable from "@/Components/User/ActivityTable.vue";

export default {
  name: "UserActivity",
  components: {
    ActivityTable,
  },
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
