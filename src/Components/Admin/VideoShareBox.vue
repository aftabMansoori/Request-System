<template>
  <el-dialog
    title=""
    :show-close="false"
    :visible="showShareBox"
    width="40%"
    append-to-body
  >
    <div class="mb-3">
      <h4 class="">Check the below details before sharing</h4>
      <small class="text-secondary"
        >The request will be updated to approved and the video will be shared
        through email</small
      >
    </div>

    <div>
      <div class="mb-1">
        <h4>Name:</h4>
        <p>{{ manageRequest.video.name }}</p>
      </div>
      <div class="mb-1">
        <h4>Created At:</h4>
        <p>{{ manageRequest.video.createdTime | date }}</p>
      </div>
      <div class="mb-1">
        <h4>Drive Video Link:</h4>
        <a
          :href="manageRequest.video.webViewLink"
          class="text-primary"
          target="_blank"
          >{{ manageRequest.video.webViewLink }}</a
        >
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click.prevent="toggleDialog">Cancel</el-button>
      <el-button
        type="primary"
        @click.prevent="updateRequest"
        :disabled="loading"
        >Approve
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
  data() {
    return {
      dialogVisible: false,
      loading: false,
    };
  },
  props: {
    showShareBox: Boolean,
    manageRequest: Object,
  },
  methods: {
    toggleDialog() {
      this.$emit("toggleDialog");
    },
    async updateRequest() {
      try {
        this.loading = true;

        const updatedRequest = await manageRequestSv(this.manageRequest);

        if (updatedRequest) {
          this.$toast.success(
            `Video shared successfully`,
            this.$config.toastConfig
          );
        }

        this.$emit("toggleDialog");
        this.$emit("cb");
        this.$emit("closeParentDialog");

        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
  },
};
</script>

<style></style>
