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
        :disabled="loading || warn"
      >
        Create Request
        <template v-if="loading"><AppSpinner /></template>
      </el-button>
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

    <div class="mt-3 warning-msg" v-if="message.length">
      <small class="">Warning</small>
      <p class="mt text-warning">{{ message }}</p>
    </div>
  </div>
</template>

<script>
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
      message: "",
      warn: false,
    };
  },
  methods: {
    setStartDate(date) {
      this.request.startDate = date;
      this.checkDates();
    },
    setEndDate(date) {
      this.request.endDate = date;
      this.checkDates();
    },
    async createLeaveRequest() {
      this.loading = true;
      try {
        const createdRequest = await createRequest(this.request);

        if (createdRequest) {
          this.$toast.success(
            "Leave request has been successfully created",
            this.$config.toastConfig
          );

          this.request.startDate = "";
          this.request.endDate = "";
          this.request.reason = "";

          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (err) {
        this.loading = false;

        this.$toast.error(
          err.response.data.message ||
            "There was an error while getting the requests",
          this.$config.toastConfig
        );
      }
    },
    checkDates() {
      if (
        this.request.startDate &&
        this.request.endDate &&
        this.request.startDate > this.request.endDate
      ) {
        this.message = "Start date should be same or before end date";
        this.warn = true;
      } else {
        this.message = "";
        this.warn = false;
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

.warning-msg {
  background: rgba(230, 162, 60, 0.321);
  padding: 1em 1.5em;
  border-radius: 7px;
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
