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
        <div>
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

      <template v-if="loading">
        <AppLoader />
      </template>
      <div class="mt-4 table-wrapper" v-else>
        <BaseTable
          :data="leavesRequested"
          @toggleDialog="handleDialog"
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

      <BaseDialog
        @action="manageStatus"
        @handleDialog="handleDialog"
        :dialogVisible="showDialog"
        :loading="loading"
        :actionText="actionText"
        :message="`Are you sure you want to ${status} the request?`"
        :title="title"
        :buttonColor="buttonColour"
      />
    </div>
  </section>
</template>

<script>
import {
  getRequests,
  manageRequest as manageRequestSv,
} from "@/services/requests";

import BaseSelect from "@/Components/BaseSelect.vue";
import BaseTable from "@/Components/BaseTable.vue";
import BaseDialog from "@/Components/BaseDialog.vue";

export default {
  name: "LeaveRequested",
  components: { BaseSelect, BaseTable, BaseDialog },

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
      selectedBatch: "all",
      selectedRequest: "requested",
      type: "leave",
      updateStatus: "",
      leaveId: null,
      showDialog: false,
      loading: false,
      showTable: true,
      leavesRequested: [],
      page: 1,
      limit: 10,
      prev: 0,
      next: 0,
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
    status() {
      return this.updateStatus === "Approved" ? "approve" : "reject";
    },
    title() {
      return this.updateStatus === "Approved"
        ? "Approve Request"
        : "Reject Request";
    },
    actionText() {
      return this.updateStatus === "Approved" ? "Approve" : "Reject";
    },
    buttonColour() {
      return this.updateStatus === "Approved" ? "success" : "danger";
    },
  },
  methods: {
    handleDialog() {
      this.showDialog = !this.showDialog;
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

        const { data } = await getRequests(
          this.type,
          this.selectedBatch,
          this.selectedRequest,
          this.page,
          this.limit
        );
        if (data.count !== 0) {
          this.leavesRequested = data.results;
          this.next = data.next;
          this.prev = data.previous;
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
    async manageStatus() {
      try {
        this.loading = true;

        const managedRequest = await manageRequestSv(this.manageRequest);

        if (managedRequest) {
          this.$toast.success(
            `Request ${managedRequest.data.requestStatus.toLowerCase()} successfully`,
            this.$config.toastConfig
          );
        }

        this.handleDialog();
        this.getLeaveRequests();

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
    nextPage() {
      this.page = this.next;
      this.getMyRequests();
    },
    prevPage() {
      this.page = this.prev;
      this.getMyRequests();
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
  width: 100%;
  display: flex;
  justify-content: space-between;
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
    overflow: auto;
    width: auto;
    padding: 1em 0.5em;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }
}
</style>
