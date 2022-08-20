<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Leave Requested</h1>
      <small class="text-secondary"
        >All the requests made by students for leave can be manage here</small
      >
    </header>

    <div>
      <div class="select-wrapper mt-4">
        <BaseSelect
          :filter="batches"
          @selected="selectBatch"
          @f="getLeaveRequests"
        />

        <BaseSelect
          :filter="requests"
          @selected="selectRequest"
          @f="getLeaveRequests"
          class="mx-1"
        />
      </div>

      <template v-if="loading">
        <AppLoader />
      </template>
      <div class="mt-4 table-wrapper" v-else>
        <BaseTable
          :data="leavesRequested"
          @toggleDialog="toggleDialog"
          @setAction="setAction"
          v-if="showTable"
        />

        <div class="no-data-img" v-if="!showTable">
          <img src="@/assets/no-data.svg" alt="" />
          <div class="mt-3 text-center">
            <h2>No requests</h2>
            <p>
              All the requests have been managed by you or no requests exists
              for now
            </p>
          </div>
        </div>
      </div>

      <LeaveDialog
        :show="show"
        @toggleDialog="toggleDialog"
        @f="getLeaveRequests"
        :manageRequest="manageRequest"
      />
    </div>
  </section>
</template>

<script>
import { getRequests } from "@/services/requests";

import BaseSelect from "@/Components/BaseSelect.vue";
import BaseTable from "@/Components/BaseTable.vue";
import LeaveDialog from "@/Components/Admin/LeaveDialog.vue";

export default {
  name: "LeaveRequested",
  components: { BaseSelect, BaseTable, LeaveDialog },

  data() {
    return {
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
      requests: [
        {
          id: 0,
          name: "Requested",
          value: "requested",
        },
        {
          id: 1,
          name: "Approved",
          value: "approved",
        },
        {
          id: 2,
          name: "Rejected",
          value: "rejected",
        },
      ],
      leavesRequested: [],
      show: false,
      selectedBatch: "all",
      selectedRequest: "requested",
      type: "leave",
      loading: false,
      leaveId: "",
      updateStatus: "",
      showTable: true,
    };
  },
  computed: {
    manageRequest() {
      return {
        id: this.leaveId,
        type: this.type,
        status: this.updateStatus,
      };
    },
  },
  methods: {
    toggleDialog() {
      this.show = !this.show;
    },
    selectBatch(value) {
      this.selectedBatch = value;
    },
    selectRequest(value) {
      this.selectedRequest = value;
    },
    async getLeaveRequests() {
      try {
        this.loading = true;

        const leaveRequests = await getRequests(
          this.type,
          this.selectedBatch,
          this.selectedRequest
        );

        if (leaveRequests.data.requests.length !== 0) {
          this.leavesRequested = leaveRequests.data.requests;
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
    setAction({ id, status }) {
      this.leaveId = id;
      this.updateStatus = status;
    },
  },
  created() {
    this.getLeaveRequests();
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
  width: 90%;
}

.select-wrapper {
  display: flex;
  justify-content: start;
}

.table-wrapper {
  height: 70vh;
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
