<template>
  <el-dialog title="Tips" :visible="show" width="30%">
    <span>This is a message</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">Cancel</el-button>
      <el-button @click="hideDialog" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    show: Boolean,
    toggleDialog: Function,
  },
  methods: {
    hideDialog() {
      this.toggleDialog();
    },
  },
};
</script>

<style></style>
