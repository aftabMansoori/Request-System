<template>
  <div>
    <el-table :data="users" style="width: 100%">
      <el-table-column type="index" min-width="35"> </el-table-column>

      <el-table-column label="Name" min-width="150">
        <template slot-scope="scope">
          {{ scope.row.username || scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Batch" min-width="100">
        <template slot-scope="scope">
          {{ scope.row.batch }}
        </template>
      </el-table-column>

      <el-table-column label="Email" min-width="250">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>

      <el-table-column label="Phone" min-width="150">
        <template slot-scope="scope"> +91 {{ scope.row.phone }} </template>
      </el-table-column>

      <el-table-column label="">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDialog(scope.row._id)"
          >
            <i class="fa-solid fa-trash"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <BaseDialog
      @action="deleteUser"
      @handleDialog="handleDialog"
      :dialogVisible="showDialog"
      :loading="loading"
      actionText="Delete"
      message="Are you sure you want to delete this user?"
      title="Delete User"
      buttonColor="danger"
    />
  </div>
</template>

<script>
import { deleteUser } from "@/services/admin";
import BaseDialog from "../BaseDialog.vue";
// @click="deleteUser(scope.row.id)"
export default {
  name: "UsersTable",
  props: {
    users: Array,
  },
  components: {
    BaseDialog,
  },
  data() {
    return {
      loading: false,
      showDialog: false,
      userId: null,
    };
  },
  methods: {
    async deleteUser() {
      try {
        this.loading = true;

        const status = await deleteUser(this.userId);

        if (status === 204) {
          this.$toast.success(
            "User deleted successfully",
            this.$config.toastConfig
          );
        }

        this.handleDialog();
        this.$emit("getStats");
        this.$emit("getAllUsers");

        this.loading = false;
      } catch (err) {
        this.loading = false;

        this.$toast.error(
          "There was an error while getting the requests",
          this.$config.toastConfig
        );
      }
    },
    handleDialog(id) {
      this.userId = id;
      this.showDialog = !this.showDialog;
    },
  },
};
</script>
