<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Requested Videos</h1>
      <small class="text-secondary"
        >All the requested videos can be accessed from here</small
      >
    </header>

    <div class="wrapper">
      <div class="no-data-img" v-if="requestVideos.length === 0">
        <img src="@/assets/no-data.svg" alt="" />
        <div class="mt-3 text-center">
          <h2>No Videos</h2>
          <p>No files is shared with you yet</p>
        </div>
      </div>
      <!-- <div class="video"></div>  -->
      <div class="mt-4 videos-wrapper" v-else>
        <div class="video-item" v-for="(v, i) in requestVideos" :key="i">
          <a :href="v.videoLink" target="_blank">
            <img
              :src="v.thumbnail"
              class="thumbnail"
              alt=""
              v-if="v.thumbnail"
            />
            <div class="video" v-else></div>
          </a>
          <h4>
            {{ v.createdTime | date }}
          </h4>
          <h5 class="text-secondary">{{ v.fileName }}</h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import fyndLogo from "@/assets/fyndlogo.png";

import { getSharedFiles } from "@/services/user";

export default {
  name: "RequestedVideos",
  data() {
    return {
      requestVideos: [],
      loading: false,
    };
  },
  methods: {
    async getRequestedVideo() {
      try {
        this.loading = true;

        const videos = await getSharedFiles();

        if (Array.isArray(videos.data)) {
          this.requestVideos = videos.data;
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
  },
  created() {
    this.getRequestedVideo();
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
}

.wrapper {
  height: 80vh;
  overflow: auto;
}
.videos-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1em 1.2em;
}

.video-item {
  flex: 0 1 250px;
}

.video {
  border-radius: 7px;
  background-color: #e3e3e3;
  background-image: url("@/assets/fyndlogo.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 150px;
}

.thumbnail {
  border-radius: 7px;
  background-color: #e3e3e3;
  height: 150px;
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

  .video-item {
    flex: 0 1 100%;
  }

  .video-item > h4 {
    text-align: center;
  }
}
</style>
