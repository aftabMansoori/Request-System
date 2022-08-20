<template>
  <el-table :data="requestData" style="width: 100%">
    <el-table-column type="index" width="50"> </el-table-column>

    <el-table-column label="Requested On">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.createdAt | date }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Requested For" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.type | toCapitalised }}</span>
      </template>
    </el-table-column>

    <el-table-column label="From">
      <template slot-scope="scope">
        <span>{{ scope.row.startDate | date }}</span>
      </template>
    </el-table-column>

    <el-table-column label="to">
      <template slot-scope="scope">
        <span>{{ scope.row.endDate | date }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Status">
      <template slot-scope="scope">
        <span :class="getStatusClass(scope.row.requestStatus)"
          >{{ scope.row.requestStatus }}
        </span>
      </template>
    </el-table-column>

    <el-table-column label="Managed by">
      <template slot-scope="scope">
        <small v-if="scope.row.adminName">by {{ scope.row.adminName }}</small>
        <small class="text-secondary" v-else>in progress</small>
      </template>
    </el-table-column>

    <el-table-column label="">
      <template slot-scope="scope">
        <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
          ><i class="fa-solid fa-pen"></i
        ></el-button> -->
        <el-button
          size="mini"
          type="danger"
          @click.prevent="handleDelete(scope.row)"
          :disabled="loading"
        >
          <i class="fa-solid fa-trash"></i>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteRequest } from "@/services/requests";

export default {
  name: "ActivityTable",
  data() {
    return {
      tableData: [],
      loading: false,
    };
  },
  props: {
    requestData: Array,
  },
  methods: {
    handleEdit(row) {
      console.log(row);
    },
    getRequests() {
      this.tableData = this.requestData;
    },
    async handleDelete(row) {
      try {
        this.loading = true;
        const status = await deleteRequest(row._id);
        if (status === 204) {
          this.$toast.success(
            "Request deleted successfully",
            this.$config.toastConfig
          );
          this.$emit("getMyRequests");
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$toast.error(
          err.response.data.message ||
            "There was an error while getting the requests",
          this.$config.toastConfig
        );
      }
    },
    getStatusClass(status) {
      if (status === "Rejected") return "text-danger fw-bold";
      else if (status === "Approved") return "text-success fw-bold";
      else return "text-secondary";
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
