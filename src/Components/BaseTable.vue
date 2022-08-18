<template>
  <div>
    <template v-if="!loading">
      <el-table :data="data">
        <el-table-column type="index" width="50"> </el-table-column>

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

        <template v-if="isAuth === 'admin'">
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="getRequestId(scope.row._id, 'Approved')"
                class="mt mx"
                v-if="
                  scope.row.type === 'video' &&
                  (scope.row.requestStatus === 'Requested' ||
                    scope.row.requestStatus === 'Rejected')
                "
                ><i class="fa-solid fa-share-nodes"></i
              ></el-button>
              <el-button
                class="mt mx"
                size="mini"
                type="danger"
                @click="showRejectDialog(scope.row._id, 'Rejected')"
                v-if="
                  scope.row.type === 'video' &&
                  (scope.row.requestStatus === 'Requested' ||
                    scope.row.requestStatus === 'Approved')
                "
                ><i class="fa-solid fa-xmark"></i
              ></el-button>

              <el-button
                type="primary"
                class="mt mx"
                size="mini"
                @click="showDialog(scope.row._id, 'Approved')"
                v-if="
                  scope.row.type === 'leave' &&
                  (scope.row.requestStatus === 'Requested' ||
                    scope.row.requestStatus === 'Rejected')
                "
                ><i class="fa-solid fa-check"></i
              ></el-button>
              <el-button
                size="mini"
                class="mt mx"
                type="danger"
                @click="showDialog(scope.row._id, 'Rejected')"
                v-if="
                  scope.row.type === 'leave' &&
                  (scope.row.requestStatus === 'Requested' ||
                    scope.row.requestStatus === 'Approved')
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

    <el-dialog
      title="Reject Request"
      :visible="show"
      width="30%"
      :show-close="false"
    >
      <span>Are your sure you want to reject the request?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">Cancel</el-button>
        <el-button
          type="danger"
          @click.prevent="handleReject"
          :disabled="tableloading"
          >Reject</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/config";

import { manageRequest as manageRequestSv } from "@/services/requests";

export default {
  name: "BaseTable",
  props: {
    data: Array,
    loading: Boolean,
  },
  data() {
    return {
      show: false,
      leaveId: "",
      status: "",
      tableloading: false,
    };
  },
  computed: {
    isAuth() {
      return localStorage.getItem("role");
    },
    managedRequest() {
      return {
        id: this.leaveId,
        type: "video",
        status: this.status,
      };
    },
  },
  methods: {
    showDialog(id, status) {
      this.$emit("toggleDialog");
      this.$emit("setAction", { id, status });
    },
    getRequestId(id) {
      this.$emit("toggleDialog");
      this.$emit("getRequestId", id);
    },
    showRejectDialog(id, status) {
      this.show = !this.show;
      this.leaveId = id;
      this.status = status;
    },
    async handleReject() {
      try {
        this.tableloading = true;

        const managedRequest = await manageRequestSv(this.managedRequest);

        if (managedRequest) {
          this.$toast.success(
            `Request rejected successfully`,
            config.toastConfig
          );
        }

        this.show = false;
        this.$emit("f");

        this.tableloading = false;
      } catch (err) {
        this.tableloading = false;
        throw err;
      }
    },
  },
};
</script>

<style></style>
