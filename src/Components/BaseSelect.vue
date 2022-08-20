<template>
  <el-select
    v-model="value"
    filterable
    placeholder="Select the batch"
    @change="selectFilter"
  >
    <el-option
      v-for="item in filter"
      :key="item.id"
      :label="item.name"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "BaseSelect",
  props: ["filter"],
  data() {
    return {
      value: this.filter[0].name,
    };
  },
  methods: {
    selectFilter() {
      this.$emit("selected", this.value);
      this.$emit("f");
    },
  },
};
</script>

<style scoped></style>
