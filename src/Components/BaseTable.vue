<template>
  <div>
    <el-table :data="data">
      <!-- <template v-if="isAuth === 'admin'">
        <el-table-column prop="name" label="Name" />
      </template> -->
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Requested On">
        <template slot-scope="scope">
          {{ scope.row.createdAt | date }}
        </template>
      </el-table-column>

      <el-table-column label="From">
        <template slot-scope="scope">
          {{ scope.row.startDate | date }}
        </template>
      </el-table-column>
      <el-table-column label="to">
        <template slot-scope="scope">
          {{ scope.row.endDate | date }}
        </template>
      </el-table-column>
      <el-table-column prop="requestStatus" label="Status" />

      <!-- <el-table-column label="Name">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template> -->
      <template v-if="isAuth === 'admin'">
        <el-table-column label="Action">
          <template>
            <el-button type="primary" size="mini" @click="showDialog"
              ><i class="fa-solid fa-check"></i
            ></el-button>
            <el-button size="mini" type="danger"
              ><i class="fa-solid fa-xmark"></i
            ></el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    toggleDialog: Function,
    data: Array,
  },
  data() {
    return {};
  },
  computed: {
    isAuth() {
      return localStorage.getItem("role");
    },
  },
  methods: {
    showDialog() {
      this.toggleDialog();
    },
  },
};
</script>

<style></style>
