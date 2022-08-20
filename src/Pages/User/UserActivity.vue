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

        <!-- <div>
          <el-button size="mini" type="primary">
            <i class="fa-solid fa-angle-left"></i
          ></el-button>

          <el-button size="mini" type="primary">
            <i class="fa-solid fa-angle-right"></i
          ></el-button>
        </div> -->
      </div>
      <div>
        <template v-if="loading">
          <AppLoader />
        </template>

        <div v-else>
          <ActivityTable
            :requestData="requestData"
            @getMyRequests="getMyRequests"
            v-if="requestData.length > 0"
          />

          <div class="no-data-img" v-else>
            <img src="@/assets/no-data.svg" alt="" />
            <div class="mt-3 text-center">
              <h2>No Videos</h2>
              <p>No requests have been made yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUserRequests } from "@/services/user";

import ActivityTable from "@/Components/User/ActivityTable.vue";
import BaseSelect from "@/Components/BaseSelect.vue";
import AppLoader from "@/Components/utils/AppLoader.vue";

export default {
  name: "UserActivity",
  components: {
    ActivityTable,
    BaseSelect,
    AppLoader,
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
      loading: false,
    };
  },
  methods: {
    async getMyRequests() {
      try {
        this.loading = true;

        const { data } = await getUserRequests(this.type);

        if (data.length > 0) {
          this.requestData = [...data];
          this.requestData.reverse();
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;

        this.$toast.error(
          err.response.data.message ||
            "There was an error while getting the requests",
          this.$config.toastConfig
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
  justify-content: space-between;
  margin-bottom: 1em;
}

.no-data-img {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.no-data-img > img {
  width: 400px;
  height: auto;
  background-color: #fff;
  margin-left: -7em;
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
