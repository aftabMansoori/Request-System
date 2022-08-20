<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Create Requests</h1>
      <small class="text-secondary"
        >Requests for Video and Leave can be made here</small
      >
    </header>

    <div class="requests-wrapper mt-4">
      <div>
        <el-radio v-model="request" label="video" border>Video</el-radio>
        <el-radio v-model="request" label="leave" border>Leave</el-radio>
      </div>

      <div class="mt-2">
        <template v-if="request === 'video'">
          <div class="components">
            <div class="calender">
              <BaseCalendar @setDay="selectDay" />
            </div>

            <div class="mt-2 textArea">
              <div class="text-area-width">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 8 }"
                  placeholder="specify the reason for your request"
                  v-model="reason"
                >
                </el-input>
              </div>

              <div class="request">
                <div>
                  <small class="text-secondary">Selected Date</small>
                  <h3 class="mt-none mb-none">
                    {{ day | date }}
                  </h3>
                </div>

                <div class="text-end">
                  <el-button
                    type="primary"
                    @click.prevent="createVideoRequest"
                    :disabled="loading"
                    round
                  >
                    Create Request
                    <template v-if="loading">
                      <AppSpinner />
                    </template>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="request === 'leave'">
          <LeaveRequest />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { createRequest } from "@/services/requests";

import BaseCalendar from "@/Components/BaseCalendar.vue";
import LeaveRequest from "@/Components/User/LeaveRequest.vue";

export default {
  name: "CreateRequest",
  components: { BaseCalendar, LeaveRequest },
  data() {
    return {
      request: "video",
      day: new Date(),
      reason: "",
      loading: false,
    };
  },
  methods: {
    selectDay(value) {
      this.day = value;
    },
    async createVideoRequest() {
      const request = {
        startDate: this.day,
        reason: this.reason,
        type: "video",
      };

      this.loading = true;

      try {
        const createdRequest = await createRequest(request);

        if (createdRequest) {
          this.$toast.success(
            "Video request has been successfully created",
            this.$config.toastConfig
          );

          this.reason = "";
          this.day = new Date();
          this.loading = false;
        }

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

<style scoped>
section {
  padding: 1em 3em;
}

.requests-wrapper {
  height: 80vh;
  overflow: auto;
}

.request {
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
  width: 400px;
}

.components {
  display: flex;
  /* justify-content: space-evenly; */
}

.tasty {
  width: 400px;
}

.calender {
  width: 50%;
}

.textArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.text-area-width {
  width: 400px;
}

@media (max-width: 768px) {
  section {
    padding: 1em;
    overflow: auto;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }

  .requests-wrapper {
    height: 100%;
  }

  .requests-wrapper > div:nth-child(1) {
    text-align: center;
  }

  .request {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .components {
    flex-direction: column;
  }

  .calender {
    width: 100%;
  }

  .textArea {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .text-area-width {
    width: 100%;
  }
}
</style>
