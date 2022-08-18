<template>
  <div class="leave-wrapper">
    <div class="date-wrapper">
      <BaseDatePicker
        class="mb-1"
        placeholder="Start Date"
        @setDate="setStartDate"
      />
      <BaseDatePicker
        class="mb-1"
        placeholder="End Date"
        @setDate="setEndDate"
      />
    </div>
    <small class="text-secondary"
      >In case of one day holiday, choose the same date in both field</small
    >
    <div class="mt-2">
      <el-input
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 8 }"
        placeholder="specify the reason for your leave"
        v-model="request.reason"
      >
      </el-input>
    </div>

    <div class="mt-3 text-end">
      <el-button
        type="primary"
        @click.prevent="createLeaveRequest"
        round
        :disabled="loading"
        >Create Request</el-button
      >
    </div>

    <div class="selected-dates">
      <article v-if="request.startDate">
        <small>From</small>
        <h3 class="text-regular mb-none mt-none">
          {{ request.startDate | date }}
        </h3>
      </article>
      <article v-if="request.endDate">
        <small>To</small>
        <h3 class="text-regular mb-none mt-none">
          {{ request.endDate | date }}
        </h3>
      </article>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import { createRequest } from "@/services/requests";

import BaseDatePicker from "../BaseDatePicker.vue";

export default {
  name: "LeaveRequest",
  components: {
    BaseDatePicker,
  },
  data() {
    return {
      request: {
        startDate: "",
        endDate: "",
        reason: "",
        type: "leave",
      },
      loading: false,
    };
  },
  methods: {
    setStartDate(date) {
      this.request.startDate = date;
    },
    setEndDate(date) {
      this.request.endDate = date;
    },
    async createLeaveRequest() {
      this.loading = true;
      try {
        const createdRequest = await createRequest(this.request);

        if (createdRequest) {
          this.$toast.success(
            "Leave request has been successfully created",
            config.toastConfig
          );

          this.request.startDate = "";
          this.request.endDate = "";
          this.request.reason = "";

          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.leave-wrapper {
  width: 50%;
}
.date-wrapper {
  display: flex;
  flex: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.selected-dates {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  align-items: center;
  margin-top: 2em;
}

@media (max-width: 768px) {
  .leave-wrapper {
    width: 100%;
  }

  .date-wrapper {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
