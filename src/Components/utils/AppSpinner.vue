<template>
  <span class="spinner"></span>
</template>

<script>
export default {
  name: "AppSpinner",
};
</script>

<style scoped>
.spinner {
  width: 14px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #fff;
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
