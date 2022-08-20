<template>
  <el-dialog title="Request" :show-close="false" :visible="show" width="30%">
    <span class="dialog-body">{{ setTitle }}</span>

    <span slot="footer" class="dialog-footer">
      <el-button @click.prevent="hideDialog">Cancel</el-button>
      <el-button
        @click.prevent="updateStatus"
        :type="setClass"
        :disabled="loading"
        >{{ setStatus }}
        <template v-if="loading">
          <AppSpinner />
        </template>
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { manageRequest as manageRequestSv } from "@/services/requests";

export default {
  name: "LeaveDialog",

  props: {
    show: Boolean,
    manageRequest: Object,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    setTitle() {
      if (this.manageRequest.status === "Approved")
        return "Are you sure you want to approve the request?";
      else return "Are you sure you want to reject the request?";
    },
    setStatus() {
      if (this.manageRequest.status === "Approved") return "Approve";
      else return "Reject";
    },
    setClass() {
      if (this.manageRequest.status === "Approved") return "success";
      else return "danger";
    },
  },
  methods: {
    hideDialog() {
      this.$emit("toggleDialog");
    },
    async updateStatus() {
      try {
        this.loading = true;

        const managedRequest = await manageRequestSv(this.manageRequest);

        if (managedRequest) {
          this.$toast.success(
            `Request ${managedRequest.data.requestStatus.toLowerCase()} successfully`,
            this.$config.toastConfig
          );
        }

        this.$emit("toggleDialog");
        this.$emit("f");

        this.loading = false;
      } catch (err) {
        this.loading = false;

        this.$toast.error(
          err.response.data.message ||
            "There was an error while getting the requests",
          this.$config.toastConfig
        );
      }
    },
  },
};
</script>

<style></style>
