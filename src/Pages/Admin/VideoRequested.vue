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

      <div class="mt-4 table-wrapper">
        <BaseTable
          :data="videosRequested"
          @toggleDialog="toggleDialog"
          @getRequestId="getRequestId"
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
    </div>
  </section>
</template>

<script>
import { getRequests } from "@/services/requests";

import BaseSelect from "@/Components/BaseSelect.vue";
import BaseTable from "@/Components/BaseTable.vue";
import VideoShareDialog from "@/Components/Admin/VideoShareDialog.vue";

export default {
  name: "VideoRequested",
  components: { BaseSelect, BaseTable, VideoShareDialog },
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
      loading: false,
      show: false,
      showTable: true,
      selectedRequest: "requested",
      requestId: "",
    };
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
        console.log(err);
        throw err;
      }
    },
    getRequestId(id) {
      this.requestId = id;
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
    padding: 1em;
    overflow: auto;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }
}
</style>
