<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" width="50"> </el-table-column>

    <el-table-column label="Name">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Date">
      <template slot-scope="scope">
        {{ scope.row.createdTime | date }}
      </template>
    </el-table-column>

    <el-table-column label="">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="setStatus(scope.row, 'Approved')"
          >Share</el-button
        >
        <!-- <el-button size="mini" type="danger" @click="rejectStatus('Rejected')"
          >Reject</el-button
        > -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "VideoShareDialog",
  props: {
    tableData: Array,
  },
  methods: {
    setStatus(video, status) {
      this.$emit("setAction", { status, video });
      this.$emit("toggleDialog");
    },
    // rejectStatus(status) {
    //   this.$emit("setAction", { status });
    //   this.$emit("toggleDialog");
    // },
  },
};
</script>

<style></style>
