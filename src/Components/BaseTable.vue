<template>
  <div>
    <template>
      <el-table :data="data">
        <el-table-column type="index" min-width="50"> </el-table-column>

        <el-table-column label="Name" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="Batch" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.batch }}
          </template>
        </el-table-column>

        <el-table-column label="Requested On" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.createdAt | date }}
          </template>
        </el-table-column>

        <el-table-column label="From" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.startDate | date }}
          </template>
        </el-table-column>
        <el-table-column label="to" min-width="130">
          <template slot-scope="scope">
            {{ scope.row.endDate | date }}
          </template>
        </el-table-column>
        <el-table-column prop="requestStatus" label="Status" min-width="100" />

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

        <template v-if="isAuth === 'admin'">
          <el-table-column label="" min-width="130">
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
                @click="videoReject(scope.row._id, 'Rejected')"
                v-if="
                  scope.row.type === 'video' &&
                  scope.row.requestStatus === 'Requested'
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

    <ReasonBox
      @toggleReason="toggleReason"
      :showReason="showReason"
      :reason="reason"
    />
  </div>
</template>

<script>
import ReasonBox from "./Admin/ReasonBox.vue";

export default {
  name: "BaseTable",
  props: {
    data: Array,
  },
  components: {
    ReasonBox,
  },
  data() {
    return {
      show: false,
      status: "",
      showReason: false,
      reason: "",
    };
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
    getRequestId(id) {
      this.$emit("toggleDialog");
      this.$emit("getRequestId", id);
    },
    videoReject(id, status) {
      this.$emit("rejectDialog", { id, status });
    },
    toggleReason(reason) {
      this.reason = reason;
      this.showReason = !this.showReason;
    },
  },
};
</script>

<style></style>
