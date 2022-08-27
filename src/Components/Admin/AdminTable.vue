<template>
  <div class="mt-2">
    <template v-if="loading">
      <AppLoader />
    </template>
    <div v-else>
      <el-table :data="adminList" v-if="adminList.length > 0">
        <el-table-column type="index" min-width="50"> </el-table-column>

        <el-table-column label="Name" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="Email" min-width="250">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>

        <el-table-column label="Phone" min-width="130">
          <template slot-scope="scope"> +91 {{ scope.row.phone }} </template>
        </el-table-column>

        <el-table-column label="Create Access" min-width="100">
          <template slot-scope="scope">
            <span
              class="fw-bold"
              :class="scope.row.canCreate ? 'text-success' : 'text-secondary'"
            >
              {{ scope.row.canCreate ? "Yes" : "No" }}
            </span>
          </template>
        </el-table-column>

        <el-table-column min-width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="toggleDialog(scope.row._id)"
              ><i class="fa-solid fa-trash"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <template v-else>
        <NoData
          title="No admin have been created yet"
          message="Create admin to see the list of admin here"
        />
      </template>

      <BaseDialog
        @action="deleteAdmim"
        @handleDialog="toggleDialog"
        :dialogVisible="showDialog"
        :loading="loading"
        actionText="Delete"
        message="Are you sure you want to delete this admin ?"
        title="Delete Admin"
        buttonColor="danger"
      />
    </div>
  </div>
</template>

<script>
import { deleteAdmim as deleteAdmimSv } from "@/services/admin";
import BaseDialog from "../BaseDialog.vue";

export default {
  name: "AdminTable",
  props: {
    adminList: Array,
  },
  components: {
    BaseDialog,
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      adminId: null,
    };
  },
  methods: {
    toggleDialog(id) {
      this.adminId = id;
      this.showDialog = !this.showDialog;
    },
    async deleteAdmim() {
      try {
        this.loading = true;

        const status = await deleteAdmimSv(this.adminId);

        if (status === 204) {
          this.$toast.success(
            "Admin deleted successfully",
            this.$config.toastConfig
          );
          this.$emit("getAllAdmin");
        }

        this.toggleDialog();

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
  },
  created() {
    this.$emit("getAllAdmin");
  },
};
</script>

<style></style>
