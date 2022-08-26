<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Video Requested</h1>
      <small class="text-secondary"
        >All the requests made by students for video can be manage here</small
      >
    </header>

    <div>
      <div class="select-wrapper mt-4">
        <BaseSelect
          :filter="batches"
          @selected="selectBatch"
          @f="getVideoRequests"
        />

        <BaseSelect
          :filter="requests"
          @selected="selectRequest"
          @f="getVideoRequests"
          class="mx-1"
        />
      </div>

      <template v-if="loading">
        <AppLoader />
      </template>
      <div class="mt-4 table-wrapper" v-else>
        <BaseTable
          @toggleDialog="toggleDialog"
          @setAction="setAction"
          @rejectDialog="rejectDialog"
          @getRequestId="getRequestId"
          @f="getVideoRequests"
          :data="videosRequested"
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

      <VideoShareDialog
        :show="show"
        @toggleDialog="toggleDialog"
        @f="getVideoRequests"
        :requestId="requestId"
      />

      <BaseDialog
        @action="handleReject"
        @handleDialog="rejectDialog"
        :dialogVisible="showReject"
        :loading="loading"
        actionText="Reject"
        message="Are you sure you want to reject the request?"
        title="Reject Request"
        buttonColor="danger"
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
import VideoShareDialog from "@/Components/Admin/VideoShareDialog.vue";
import BaseDialog from "@/Components/BaseDialog.vue";

export default {
  name: "VideoRequested",
  components: { BaseSelect, BaseTable, VideoShareDialog, BaseDialog },
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
      videosRequested: [],
      selectedBatch: "all",
      type: "video",
      selectedRequest: "requested",
      requestId: null,
      status: "",
      loading: false,
      show: false,
      showReject: false,
      showTable: true,
    };
  },
  methods: {
    toggleDialog() {
      this.show = !this.show;
    },
    rejectDialog() {
      this.showReject = !this.showReject;
    },
    selectBatch(value) {
      this.selectedBatch = value;
    },
    selectRequest(value) {
      this.selectedRequest = value;
    },
    async getVideoRequests() {
      try {
        this.loading = true;

        const videoRequests = await getRequests(
          this.type,
          this.selectedBatch,
          this.selectedRequest
        );

        if (videoRequests.data.requests.length !== 0) {
          this.videosRequested = videoRequests.data.requests;
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
    getRequestId(id) {
      this.requestId = id;
    },
    async handleReject() {
      try {
        this.loading = true;

        const requestFor = {
          id: this.requestId,
          type: this.type,
          status: this.status,
        };

        const managedRequest = await manageRequestSv(requestFor);

        if (managedRequest) {
          this.$toast.success(
            `Request rejected successfully`,
            this.$config.toastConfig
          );
        }

        this.getVideoRequests();
        this.showReject = false;

        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
    setAction({ id, status }) {
      this.requestId = id;
      this.status = status;
    },
  },
  created() {
    this.getVideoRequests();
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
    width: auto;
    padding: 1em 0.5em;
    overflow: auto;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }
}
</style>
