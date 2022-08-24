<template>
  <el-dialog
    title="Reason"
    :visible="showReason"
    width="30%"
    :before-close="handleClose"
  >
    {{ reason }}
  </el-dialog>
</template>

<script>
export default {
  name: "ReasonBox",
  props: {
    showReason: Boolean,
    reason: String,
  },
  data() {
    return {
      data: false,
    };
  },
  methods: {
    handleClose() {
      this.$emit("toggleReason", "");
    },
  },
};
</script>

<style></style>
