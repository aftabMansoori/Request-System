<template>
  <div class="leave-wrapper">
    <div class="date-wrapper">
      <BaseDatePicker
        placeholder="Start Date"
        class="mb-1"
        @setDate="setStartDate"
      />
      <BaseDatePicker
        placeholder="End Date"
        class="mb-1"
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
        placeholder="Please input"
        v-model="reason"
      >
      </el-input>
    </div>

    <!-- <div class="selected-dates">
      <article class="date" v-html="selectedDate(startDate)"></article>

      <h2>to</h2>

      <article class="date">
        <div class="date1">August</div>
        <div class="date2">8</div>
        <div class="date3">2022</div>
      </article>
    </div> -->

    <div class="mt-3 text-end">
      <el-button type="primary" round>Create Request</el-button>
    </div>
  </div>
</template>

<script>
import BaseDatePicker from "../BaseDatePicker.vue";

export default {
  name: "LeaveRequest",
  components: {
    BaseDatePicker,
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      reason: "",
    };
  },
  methods: {
    setStartDate(date) {
      this.startDate = date.selectedDate;
    },
    setEndDate(date) {
      this.endDate = date.selectedDate;
    },
    selectedDate(date) {
      const dateEl = date.toString().split(" ");

      let dateBox = `
        <div class"date1">${dateEl[1]}</div>
        <div class"date2">${dateEl[2]}</div>
        <div class"date3">${dateEl[3]}</div>
      `;

      return dateBox;
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
  justify-content: space-evenly;
  margin-top: 1em;
  align-items: center;
}
.date {
  width: 120px;
  height: 130px;
  border: 1px solid #aeb2b8;
  border-radius: 7px;
  margin: 1em 0;
}

.date1 {
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 1.1em;
}

.date2 {
  height: 60%;
  font-size: 4em;
  font-weight: 600;
  text-align: center;
  border-top: 1px solid #909399;
  border-bottom: 1px solid #909399;
  width: 100%;
}

.date3 {
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 1.1em;
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
