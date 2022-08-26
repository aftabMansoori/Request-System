<template>
  <el-dialog
    :title="title || 'Title'"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>{{ message }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button :type="buttonColor || 'primary'" @click.prevent="approveAction"
        >{{ actionText || "Ok" }}
        <template v-if="loading">
          <AppSpinner />
        </template>
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "BaseDialog",
  props: {
    dialogVisible: Boolean,
    loading: Boolean,
    actionText: String,
    message: String,
    title: String,
    buttonColor: String,
  },
  methods: {
    handleClose() {
      this.$emit("handleDialog");
    },
    approveAction() {
      this.$emit("action");
    },
  },
};
</script>

<style></style>
