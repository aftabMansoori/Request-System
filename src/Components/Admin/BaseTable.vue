<template>
  <el-table :data="requests">
    <el-table-column prop="name" label="Name" />
    <el-table-column label="Requested On">
      <template slot-scope="scope">
        {{ scope.row.requestedOn | date }}
      </template>
    </el-table-column>

    <el-table-column label="Requested For">
      <template slot-scope="scope">
        {{ scope.row.requestedFor || scope.row.startDate | date }}
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="Phone" />

    <!-- <el-table-column label="Name">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template> -->
    <el-table-column label="Operations">
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          ><i class="fa-solid fa-check"></i
        ></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          ><i class="fa-solid fa-xmark"></i
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "BaseTable",
  props: ["data"],
  data() {
    console.log(this.data.requestedFor);
    return {
      requests: this.data,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style></style>
