<template>
  <el-table :data="tableData" style="width: 100%">
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
          @click="handleEdit(scope.$index, scope.row)"
          >Share</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Reject</el-button
        >
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
};
</script>

<style></style>
