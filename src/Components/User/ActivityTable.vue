<template>
  <div>
    <el-table :data="requestData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>

      <el-table-column label="Requested On" min-width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            scope.row.createdAt | date
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Requested For" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.type | toCapitalised }}</span>
        </template>
      </el-table-column>

      <el-table-column label="From" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate | date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="to" min-width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate | date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Status" min-width="100">
        <template slot-scope="scope">
          <span :class="getStatusClass(scope.row.requestStatus)"
            >{{ scope.row.requestStatus }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="Managed by" min-width="100">
        <template slot-scope="scope">
          <small v-if="scope.row.adminName">by {{ scope.row.adminName }}</small>
          <small class="text-secondary" v-else>in progress</small>
        </template>
      </el-table-column>

      <el-table-column label="" min-width="50">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="show reason"
            placement="top"
          >
            <i
              class="fa-solid fa-file text-secondary"
              @click="toggleReason(scope.row.reason)"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            :disabled="loading"
            @click="handleDialog(scope.row._id)"
          >
            <i class="fa-solid fa-trash"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <BaseDialog
      :dialogVisible="showDialog"
      @handleDialog="handleDialog"
      @action="handleDelete"
      :loading="loading"
      actionText="Delete"
      message="Are you sure you want to delete the request?"
      title="Delete Request"
      buttonColor="danger"
    />

    <ReasonBox
      @toggleReason="toggleReason"
      :showReason="showReason"
      :reason="reason"
    />
  </div>
</template>

<script>
import { deleteRequest } from "@/services/requests";

import ReasonBox from "../Admin/ReasonBox.vue";
import BaseDialog from "../BaseDialog.vue";

export default {
  name: "ActivityTable",
  data() {
    return {
      tableData: [],
      loading: false,
      showReason: false,
      reason: "",
      showDialog: false,
      requestId: null,
    };
  },
  props: {
    requestData: Array,
  },
  components: {
    ReasonBox,
    BaseDialog,
  },
  methods: {
    getRequests() {
      this.tableData = this.requestData;
    },
    async handleDelete() {
      try {
        this.loading = true;
        const status = await deleteRequest(this.requestId);
        if (status === 204) {
          this.$toast.success(
            "Request deleted successfully",
            this.$config.toastConfig
          );
          this.$emit("getMyRequests");
        }
        this.handleDialog();

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
    toggleReason(reason) {
      this.reason = reason;
      this.showReason = !this.showReason;
    },
    handleDialog(id) {
      this.requestId = id;
      this.showDialog = !this.showDialog;
    },
  },
};
</script>

<style scoped></style>
