<template>
  <div>
    <template v-if="!loading">
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
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="showDialog(scope.row._id, 'Approved')"
                v-if="
                  scope.row.requestStatus === 'Requested' ||
                  scope.row.requestStatus === 'Rejected'
                "
                ><i class="fa-solid fa-check"></i
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="showDialog(scope.row._id, 'Rejected')"
                v-if="
                  scope.row.requestStatus === 'Requested' ||
                  scope.row.requestStatus === 'Approved'
                "
                ><i class="fa-solid fa-xmark"></i
              ></el-button>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </template>
    <template v-else>
      <span>loading....</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    data: Array,
    loading: Boolean,
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
    showDialog(id, status) {
      this.$emit("toggleDialog");
      this.$emit("setAction", { id, status });
    },
  },
};
</script>

<style></style>
