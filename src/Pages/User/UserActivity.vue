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

        <div class="d-sm-none" style="margin-right: 3em">
          <el-row>
            <el-button
              type="primary"
              size="small"
              @click="prevPage"
              :disabled="!prev"
              round
              ><i class="fa-solid fa-arrow-left"></i></el-button
            ><el-button
              type="primary"
              size="small"
              @click="nextPage"
              :disabled="!next"
              round
              ><i class="fa-solid fa-arrow-right"></i
            ></el-button>
          </el-row>
        </div>
      </div>
      <div>
        <template v-if="loading">
          <AppLoader />
        </template>

        <div v-else>
          <div class="table-wrapper" v-if="requestData.length > 0">
            <ActivityTable
              :requestData="requestData"
              @getMyRequests="getMyRequests"
            />
          </div>

          <div class="no-data-img" v-else>
            <img src="@/assets/no-data.svg" alt="" />
            <div class="mt-3 text-center">
              <h2>No Requests</h2>
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
      page: 1,
      limit: 10,
      prev: 0,
      next: 0,
    };
  },
  methods: {
    async getMyRequests() {
      try {
        this.loading = true;

        const { data } = await getUserRequests(
          this.type,
          this.page,
          this.limit
        );
        const { results, next, previous } = data;

        if (results.length > 0) {
          this.requestData = results;
          this.next = next;
          this.prev = previous;
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
    nextPage() {
      this.page = this.next;
      this.getMyRequests();
    },
    prevPage() {
      this.page = this.prev;
      this.getMyRequests();
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

.table-wrapper {
  height: 76vh;
  overflow: auto;
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
