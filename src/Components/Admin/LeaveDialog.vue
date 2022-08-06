<template>
  <el-dialog title="Manage Leave" :visible="show" width="30%">
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">Cancel</el-button>
      <el-button @click="hideDialog" type="primary">Share</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "LeaveDialog",

  props: {
    show: Boolean,
    toggleDialog: Function,
  },
  date() {
    return {
      date: "2022-08-08",
    };
  },
  methods: {
    hideDialog() {
      this.toggleDialog();
    },
  },
};
</script>

<style></style>
