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
                    <small v-if="scope.row.adminName"
                        >by {{ scope.row.adminName }}</small
                    >
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
                        @click.prevent="handleDelete(scope.row)"
                        :disabled="loading"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

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

export default {
    name: "ActivityTable",
    data() {
        return {
            tableData: [],
            loading: false,
            showReason: false,
            reason: "",
        };
    },
    props: {
        requestData: Array,
    },
    components: {
        ReasonBox,
    },
    methods: {
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
        toggleReason(reason) {
            this.reason = reason;
            this.showReason = !this.showReason;
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
