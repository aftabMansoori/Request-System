<template>
  <el-dialog title="Tips" :visible.sync="showDialogBox" width="30%">
    <span>This is a message</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog">Cancel</el-button>
      <el-button @click="showDialog" type="primary">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    show: Boolean,
    showDialog: Function,
  },
  data() {
    console.log(this.show);
    return {
      showDialogBox: this.show,
    };
  },
  computed: {
    // toggle() {
    //   console.log(this.showDialogBox);
    //   return this.showDialog();
    // },
  },
};
</script>

<style></style>
