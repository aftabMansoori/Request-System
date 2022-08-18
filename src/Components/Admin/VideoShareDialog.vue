<template>
  <el-dialog title="Share Video" :visible="show" width="30%">
    <BaseDatePicker message="Check the details and share the video" />
    <span slot="footer" class="dialog-footer">
      <el-button @click.prevent="hideDialog">Cancel</el-button>
      <el-button @click.prevent="updateStatus" type="primary">Share</el-button>
    </span>
  </el-dialog>
</template>

<script>
import BaseDatePicker from "../BaseDatePicker.vue";

export default {
  name: "VideoShareDialog",
  components: {
    BaseDatePicker,
  },
  props: {
    show: Boolean,
    manageRequest: Object,
  },
  date() {
    return {
      date: "2022-08-08",
    };
  },
  methods: {
    hideDialog() {
      this.$emit("toggleDialog");
    },
    updateStatus() {
      this.$emit("toggleDialog");
    },
  },
};
</script>

<style></style>
