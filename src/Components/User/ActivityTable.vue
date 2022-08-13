<template>
  <el-table :data="requestData" style="width: 100%">
    <el-table-column label="Requested On" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.createdAt | date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Requested For" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.type }}</span>
      </template>
    </el-table-column>
    <el-table-column label="From" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.startDate | date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="to" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.endDate | date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Status" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.requestStatus }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column> -->
    <el-table-column label="">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ActivityTable",
  data() {
    return {
      tableData: [],
    };
  },
  props: {
    requestData: Array,
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getRequests() {
      this.tableData = this.requestData;
    },
  },
};
</script>

<style scoped>
.approved {
  background-color: rgb(109, 177, 109);
  color: white;
  padding: 1em 1.5em;
  border-radius: 1.1em;
}
</style>
