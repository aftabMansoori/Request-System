<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Create Requests</h1>
      <small class="text-secondary"
        >Requests for Video and Leave can be made here</small
      >
    </header>

    <div class="requests-wrapper mt-4">
      <div>
        <el-radio v-model="request" label="video" border>Video</el-radio>
        <el-radio v-model="request" label="leave" border>Leave</el-radio>
      </div>

      <div class="mt-2">
        <template v-if="request === 'video'">
          <BaseCalendar />
        </template>
        <template v-if="request === 'leave'">
          <LeaveRequest />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import BaseCalendar from "@/Components/BaseCalendar.vue";
import LeaveRequest from "@/Components/User/LeaveRequest.vue";

export default {
  name: "CreateRequest",
  components: { BaseCalendar, LeaveRequest },
  data() {
    return {
      request: "video",
    };
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

.requests-wrapper {
  height: 80vh;
  overflow: auto;
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

  .requests-wrapper {
    height: 100%;
  }

  .requests-wrapper > div:nth-child(1) {
    text-align: center;
  }
}
</style>
