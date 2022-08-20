<template>
  <div>
    <el-date-picker
      type="date"
      :placeholder="placeholder || 'Pick a day'"
      @change="selectDate"
      v-model="selectedDate"
      :clearable="false"
    />
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
      this.$emit("setDate", this.selectedDate);
      this.$emit("f");
    },
  },
};
</script>

<style></style>
