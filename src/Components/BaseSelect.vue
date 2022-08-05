<template>
  <el-select
    v-model="value"
    filterable
    placeholder="Select the batch"
    style="width: 350px"
  >
    <el-option
      v-for="item in batches"
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
  props: ["batches"],
  data() {
    return {
      value: this.batches[0].name,
    };
  },
};
</script>

<style scoped></style>
