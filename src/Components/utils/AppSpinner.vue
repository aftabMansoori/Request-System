<template>
  <span
    class="spinner"
    :style="`border-color: ${color}; width: ${width}; height: ${height};`"
  ></span>
</template>

<script>
export default {
  name: "AppSpinner",
  props: ["color", "height", "width"],
};
</script>

<style scoped>
.spinner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid;
  border-color: #fff;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
