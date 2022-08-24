<template>
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
        <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">
          <i class="fa-solid fa-trash"></i
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { deleteUser } from "@/services/admin";

export default {
  name: "UsersTable",
  props: {
    users: Array,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async deleteUser(id) {
      try {
        this.loading = true;

        const status = await deleteUser(id);

        if (status === 204) {
          this.$toast.success(
            "User deleted successfully",
            this.$config.toastConfig
          );
        }

        this.$emit("getAllUsers");
        this.$emit("getStats");

        this.loading = false;
      } catch (err) {
        this.loading = false;

        this.$toast.error(
          "There was an error while getting the requests",
          this.$config.toastConfig
        );
      }
    },
  },
};
</script>
