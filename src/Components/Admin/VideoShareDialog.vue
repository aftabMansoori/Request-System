<template>
  <el-dialog :show-close="false" :visible="show" :fullscreen="true">
    <div class="closeBtn">
      <button @click.prevent="hideDialog">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <div class="wrapper">
      <div class="header mb-3">
        <div>
          <h4 class="mb-2">Filter the videos and share it</h4>

          <div class="filters">
            <BaseSelect :filter="batches" @selected="setBatch" @f="getVideos" />
            <BaseDatePicker class="mx-2" @setDate="setDay" @f="getVideos" />
          </div>
        </div>
      </div>

      <template v-if="loading">
        <AppLoader />
      </template>
      <div class="table-wrapper" v-else>
        <VideoShareTable
          @setAction="setAction"
          @toggleDialog="shareVideoDialog"
          :tableData="videoList"
          v-if="videoList.length > 0"
        />

        <div class="no-data-img" v-else>
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
    </div>

    <VideoShareBox
      :showShareBox="showShareBox"
      @toggleDialog="shareVideoDialog"
      :manageRequest="manageRequest"
      @cb="getVideoRequestsCB"
      @closeParentDialog="hideDialog"
    />
  </el-dialog>
</template>

<script>
import { getVideosByBatch } from "@/services/admin";

import BaseDatePicker from "../BaseDatePicker.vue";
import BaseSelect from "../BaseSelect.vue";
import VideoShareTable from "./VideoShareTable.vue";
import VideoShareBox from "./VideoShareBox.vue";

export default {
  name: "VideoShareDialog",
  components: {
    BaseDatePicker,
    BaseSelect,
    VideoShareTable,
    VideoShareBox,
  },
  props: {
    show: Boolean,
    requestId: String,
  },
  data() {
    return {
      day: null,
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
      batch: "all",
      loading: false,
      videoList: [],
      leaveId: "",
      updateStatus: "",
      type: "video",
      video: {},
      showShareBox: false,
    };
  },
  computed: {
    manageRequest() {
      return {
        id: this.requestId,
        type: this.type,
        status: this.updateStatus,
        video: this.video,
      };
    },
  },
  methods: {
    hideDialog() {
      this.$emit("toggleDialog");
    },
    setDay(day) {
      this.day = new Date(day).toISOString();
    },
    setBatch(batch) {
      this.batch = batch;
    },
    async getVideos() {
      try {
        this.loading = true;

        const response = await getVideosByBatch(this.batch, this.day);

        if (response) {
          this.videoList = response.data.files;
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
    setAction({ status, video }) {
      this.video = video;
      this.updateStatus = status;
    },
    shareVideoDialog() {
      this.showShareBox = !this.showShareBox;
    },
    getVideoRequestsCB() {
      this.$emit("f");
    },
  },
  created() {
    this.getVideos();
  },
};
</script>

<style scoped>
.wrapper {
  margin: 0 8em;
}
.header {
  display: flex;
  justify-content: space-between;
}

.filters {
  display: flex;
  align-items: flex-end;
}

.closeBtn {
  margin-top: -3em;
  text-align: end;
  margin-bottom: 2em;
}
.closeBtn > button {
  background: none;
  border: none;
  cursor: pointer;
}

.table-wrapper {
  height: 73vh;
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
  .wrapper {
    margin: 0;
  }
  .header {
    display: flex;
    flex-direction: column;
  }

  .filters > div {
    margin-bottom: 1em;
    width: 100%;
  }
}
</style>
