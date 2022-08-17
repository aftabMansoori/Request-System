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

    <VideoShareTable :tableData="videoList" :loading="loading" />

    <!-- <span slot="footer" class="dialog-footer">
 
    </span> -->
  </el-dialog>
</template>

<script>
import { getVideosByBatch } from "@/services/admin";

import BaseDatePicker from "../BaseDatePicker.vue";
import BaseSelect from "../BaseSelect.vue";
import VideoShareTable from "./VideoShareTable.vue";

export default {
  name: "VideoShareDialog",
  components: {
    BaseDatePicker,
    BaseSelect,
    VideoShareTable,
  },
  props: {
    show: Boolean,
    manageRequest: Object,
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
    };
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
  },
  created() {
    this.getVideos();
  },
};
</script>

<style scoped>
/* .el-dialog__headerbtn {
  display: none;
} */

.header {
  display: flex;
  justify-content: space-between;
}
</style>
