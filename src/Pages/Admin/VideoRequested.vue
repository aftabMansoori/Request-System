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
        <BaseSelect :batches="batches" />
      </div>

      <div class="mt-4 table-wrapper">
        <BaseTable :data="videosRequested" :toggleDialog="toggleDialog" />
      </div>

      <VideoShareDialog :show="show" :toggleDialog="toggleDialog" />
    </div>
  </section>
</template>

<script>
import BaseSelect from "@/Components/BaseSelect.vue";
import BaseTable from "@/Components/BaseTable.vue";
import VideoShareDialog from "@/Components/Admin/VideoShareDialog.vue";

import { RequestedVideo } from "@/data/RequestedVideoData";

export default {
  name: "VideoRequested",
  components: { BaseSelect, BaseTable, VideoShareDialog },
  data() {
    return {
      batches: [
        {
          id: 0,
          name: "JavaScript FullStack Batch 1",
          value: "mevn-batch-1",
        },
        {
          id: 1,
          name: "JavaScript FullStack Batch 2",
          value: "mevn-batch-2",
        },
        {
          id: 2,
          name: "DJANGO FullStack",
          value: "django",
        },
        {
          id: 3,
          name: "UI/UX Developer",
          value: "ui-ux",
        },
      ],
      videosRequested: [...RequestedVideo],
      show: false,
    };
  },
  methods: {
    toggleDialog() {
      this.show = !this.show;
    },
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
