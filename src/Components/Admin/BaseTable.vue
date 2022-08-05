<template>
  <div>
    <el-table :data="requests">
      <template v-if="isAuth === 'admin'">
        <el-table-column prop="name" label="Name" />
      </template>
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
      <template v-if="isAuth === 'admin'">
        <el-table-column label="Operations">
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

      <template v-if="isAuth === 'user'">
        <el-table-column label="Status">
          <!-- <template slot-scope="scope">
            status
          </template> -->
        </el-table-column>
      </template>
    </el-table>

    <!-- <BaseDialog :show="show" :showDialog="showDialog" /> -->
  </div>
</template>

<script>
// import BaseDialog from "./BaseDialog.vue";

export default {
  name: "BaseTable",
  props: ["data"],
  // components: { BaseDialog },
  data() {
    return {
      requests: this.data,
      show: false,
    };
  },
  computed: {
    isAuth() {
      return localStorage.getItem("role");
    },
    // showDialog() {
    //   this.show = !this.show;
    //   return this.show;
    // },
  },
};
</script>

<style></style>
