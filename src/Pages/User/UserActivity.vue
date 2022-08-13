<template>
  <section>
    <h1 class="text-primary mb-none">User Activity</h1>
    <small class="text-secondary"
      >All the requests and their status will be available</small
    >

    <div class="mt-4">
      <div class="filter">
        <BaseSelect
          :filter="typeData"
          @selected="selectFilter"
          @f="getMyRequests"
        />
      </div>
      <div>
        <ActivityTable :requestData="requestData" />
      </div>
    </div>
  </section>
</template>

<script>
import { getUserRequests } from "@/services/user";

import ActivityTable from "@/Components/User/ActivityTable.vue";
import BaseSelect from "@/Components/BaseSelect.vue";
import config from "@/config";

export default {
  name: "UserActivity",
  components: {
    ActivityTable,
    BaseSelect,
  },
  data() {
    return {
      typeData: [
        {
          id: 0,
          name: "All",
          value: "all",
        },
        {
          id: 1,
          name: "Video",
          value: "video",
        },
        {
          id: 2,
          name: "Leave",
          value: "leave",
        },
      ],
      requestData: [],
      type: "all",
    };
  },
  methods: {
    async getMyRequests() {
      try {
        const { data } = await getUserRequests(this.type);

        this.requestData = [...data];
      } catch (err) {
        this.$toast.error(
          err.response.data.message ||
            "There was an error while getting the requests",
          config.toastConfig
        );
      }
    },
    selectFilter(selected) {
      this.type = selected;
    },
  },
  async created() {
    await this.getMyRequests();
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

.filter {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 1em;
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
