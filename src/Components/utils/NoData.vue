<template>
  <div class="no-data-img">
    <img src="@/assets/no-data.svg" alt="" />
    <div class="mt-3 text-center">
      <h2>{{ title || "No Data" }}</h2>
      <p>
        {{ message || "No data is available to show" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    title: String,
    message: String,
  },
};
</script>

<style scoped>
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
</style>
