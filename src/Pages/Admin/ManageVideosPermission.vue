<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Manage Videos Permission</h1>
      <small class="text-secondary"
        >You can handle the permissions of videos share here</small
      >
    </header>

    <div>
      <div class="select-wrapper mt-4">
        <BaseSelect :filter="batches" @selected="setBatch" />
      </div>

      <div class="mt-4 table-wrapper">
        <VideoShareTableVue :tableData="videoList" />
        <!-- <div class="no-data-img" v-if="!showTable">
          <img src="@/assets/no-data.svg" alt="" />
          <div class="mt-3 text-center">
            <h2>No requests</h2>
            <p>
              All the requests have been managed by you or no requests exists
              for now
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import { getVideosByBatch } from "@/services/admin";

import BaseSelect from "@/Components/BaseSelect.vue";
import VideoShareTableVue from "@/Components/Admin/VideoShareTable.vue";

export default {
  name: "ManageVideosPermission",
  components: { BaseSelect, VideoShareTableVue },
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
      batch: "all",
      loading: false,
      videoList: [],
    };
  },
  methods: {
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
</style>
