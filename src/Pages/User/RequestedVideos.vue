<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Requested Videos</h1>
      <small class="text-secondary"
        >All the requested videos can be accessed from here</small
      >
    </header>

    <div class="mt-4 videos-wrapper">
      <div class="video-item" v-for="(v, i) in value" :key="i">
        <div class="video"></div>
        <h4>{{ v.date | date }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
import fyndLogo from "@/assets/fyndlogo.png";

export default {
  name: "RequestedVideos",
  data() {
    return {
      value: Array(19).fill({ img: fyndLogo, date: new Date() }),
    };
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
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
