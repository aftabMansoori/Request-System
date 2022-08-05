<template>
  <section>
    <div>
      <p class="mb-1">{{ message }}</p>
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="Pick a day"
        @change="selectDate"
        style="width: 100%"
      >
      </el-date-picker>
      <h3 class="my-1 mx">
        {{ selectedDate | date }}
      </h3>
    </div>
  </section>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    message: String,
  },
  data() {
    return {
      selectedDate: "",
    };
  },
  methods: {
    selectDate() {
      console.log(this.selectedDate);
    },
  },
};
</script>

<style></style>
