<template>
  <div>
    <el-date-picker
      v-model="selectedDate"
      type="date"
      :placeholder="placeholder || 'Pick a day'"
      @change="selectDate"
      style="width: 100%"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    placeholder: String,
  },
  data() {
    return {
      selectedDate: "",
    };
  },
  methods: {
    selectDate() {
      this.$emit("setDate", { selectedDate: this.selectedDate });
    },
  },
};
</script>

<style></style>
