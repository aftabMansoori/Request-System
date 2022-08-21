<template>
  <section>
    <div class="header">
      <h1 class="text-primary mb-none">Dashboard</h1>
      <small class="text-secondary">View your activity and stats here</small>
    </div>

    <div class="mb-3">
      <div class="stats">
        <article>
          <h5 class="text-secondary">Number of Leaves Requested</h5>
          <p v-if="stats.leaveRequests">{{ stats.leaveRequests }}</p>
          <p v-else>
            <AppSpinner color="rgb(245, 108, 108)" height="22px" width="22px" />
          </p>
        </article>
        <article>
          <h5 class="text-secondary">Number of Videos Requested</h5>
          <p v-if="stats.videoRequests">{{ stats.videoRequests }}</p>
          <p v-else>
            <AppSpinner color="rgb(230, 162, 60)" height="22px" width="22px" />
          </p>
        </article>
        <article>
          <h5 class="text-secondary">Number of Users</h5>
          <p v-if="stats.users">{{ stats.users }}</p>
          <p v-else>
            <AppSpinner color="rgb(116, 246, 170)" height="22px" width="22px" />
          </p>
        </article>
      </div>
    </div>

    <div class="mb-2">
      <BaseSelect :filter="batches" @selected="selectBatch" @f="getAllUsers" />
    </div>

    <template v-if="loading">
      <AppLoader />
    </template>
    <div v-else>
      <UsersTable
        :users="users"
        @f="getAllUsers"
        @getStats="getStats"
        v-if="showTable"
      />

      <div class="no-data-img" v-else>
        <img src="@/assets/no-data.svg" alt="" />
        <div class="mt-3 text-center">
          <h2>No requests</h2>
          <p>
            All the requests have been managed by you or no requests exists for
            now
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAllUsers } from "@/services/user";
import { getStats } from "@/services/admin";

import UsersTable from "@/Components/Admin/UsersTable.vue";
import BaseSelect from "@/Components/BaseSelect.vue";

export default {
  name: "AdminDashboard",
  components: {
    UsersTable,
    BaseSelect,
  },
  data() {
    return {
      loading: false,
      users: [],
      showTable: true,
      stats: {},
      batches: [
        {
          id: 0,
          name: "All",
          value: "all",
        },
        {
          id: 1,
          name: "JavaScript FullStack Batch 1",
          value: "mevn-batch-1",
        },
        {
          id: 2,
          name: "JavaScript FullStack Batch 2",
          value: "mevn-batch-2",
        },
        {
          id: 3,
          name: "DJANGO FullStack",
          value: "django",
        },
        {
          id: 4,
          name: "UI/UX Developer",
          value: "ui-ux",
        },
      ],
      selectedBatch: "all",
    };
  },
  methods: {
    async getAllUsers() {
      try {
        this.loading = true;

        const allUsers = await getAllUsers(this.selectedBatch);

        if (allUsers.data.users.length > 0) {
          this.users = allUsers.data.users;
          this.showTable = true;
        } else {
          this.showTable = false;
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

    async getStats() {
      try {
        this.loading = true;

        const statsRes = await getStats();
        this.stats = statsRes.data;

        this.loading = false;
      } catch (err) {
        this.loading = false;

        this.$toast.error(
          "There was an error while getting the requests",
          this.$config.toastConfig
        );
      }
    },

    selectBatch(batch) {
      this.selectedBatch = batch;
    },
  },
  created() {
    this.getAllUsers();
    this.getStats();
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  margin-top: 3em;
}

.stats > article {
  width: 250px;
  height: 80px;
  margin-inline-end: 2em;
  padding: 1em 2em;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.stats > article:nth-child(1) p {
  color: rgb(245, 108, 108);
  font-size: 3em;
  font-weight: 600;
}
.stats > article:nth-child(2) p {
  color: rgb(230, 162, 60);
  font-weight: 600;
  font-size: 3em;
}

.stats > article:nth-child(3) p {
  color: rgb(116, 246, 170);
  font-weight: 600;
  font-size: 3em;
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
  .header {
    text-align: center;
    margin-bottom: 2em;
  }

  .stats > article {
    width: 100%;
    margin: 1em 0.5em;
  }
}
</style>
