<template>
  <div class="calender-wrapper">
    <div class="calendar">
      <el-calendar v-model="value" />
    </div>
    <div class="request">
      <div>
        <small class="text-secondary">Selected Date</small>
        <h3 class="mt-none mb-none">
          {{ value | date }}
        </h3>
      </div>

      <div class="text-end">
        <el-button type="primary" round>Create Request</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCalender",
  data() {
    return {
      value: new Date(),
    };
  },
  methods: {
    selectDate() {
      console.log(this.value);
    },
  },
};
</script>

<style scoped>
.calender-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.calendar,
.request {
  width: 50%;
}

.request {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .calendar,
  .request {
    width: 100%;
  }

  .request {
    display: flex;
    justify-content: space-around;
  }
}
</style>
