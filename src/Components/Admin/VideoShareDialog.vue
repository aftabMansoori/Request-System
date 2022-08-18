<template>
  <el-dialog
    :show-close="false"
    title="Share Video"
    :visible="show"
    :fullscreen="true"
  >
    <div class="header">
      <div>
        <h4 class="mb-2">Filter the videos and share it</h4>

        <div style="display: flex; align-items: flex-end">
          <BaseSelect :filter="batches" @selected="setBatch" @f="getVideos" />
          <BaseDatePicker class="mx-2" @setDate="setDay" v-if="!!batch" />
        </div>
      </div>

      <div>
        <el-button @click.prevent="hideDialog">Cancel</el-button>
      </div>
    </div>

    <VideoShareTable
      @setAction="setAction"
      @toggleDialog="shareVideoDialog"
      :tableData="videoList"
    />

    <VideoShareBox
      :showShareBox="showShareBox"
      @toggleDialog="shareVideoDialog"
      :manageRequest="manageRequest"
      @cb="getVideoRequestsCB"
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
.header {
  display: flex;
  justify-content: space-between;
}
</style>
