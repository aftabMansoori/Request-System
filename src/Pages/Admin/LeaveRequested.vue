<template>
  <section>
    <header>
      <h1 class="text-primary mb-none">Leave Requested</h1>
      <small class="text-secondary"
        >All the requests made by students for leave can be manage here</small
      >
    </header>

    <div>
      <div class="select-wrapper mt-4">
        <BaseSelect
          :filter="batches"
          @selected="selectBatch"
          @f="getLeaveRequests"
        />
      </div>

      <div class="mt-4 table-wrapper">
        <BaseTable :data="leavesRequested" :toggleDialog="toggleDialog" />
      </div>

      <LeaveDialog :show="show" :toggleDialog="toggleDialog" />
    </div>
  </section>
</template>

<script>
import { getRequests } from "@/services/requests";

import BaseSelect from "@/Components/BaseSelect.vue";
import BaseTable from "@/Components/BaseTable.vue";
import LeaveDialog from "@/Components/Admin/LeaveDialog.vue";

// import { RequestedLeaves } from "@/data/RequestedLeaveData";

export default {
  name: "LeaveRequested",
  components: { BaseSelect, BaseTable, LeaveDialog },

  data() {
    return {
      batches: [
        {
          id: 0,
          name: "All",
          value: "all",
        },
        {
          id: 1,
          name: "JavaScript FullStack Batch 1",
          value: "mevn-batch-1",
        },
        {
          id: 2,
          name: "JavaScript FullStack Batch 2",
          value: "mevn-batch-2",
        },
        {
          id: 3,
          name: "DJANGO FullStack",
          value: "django",
        },
        {
          id: 4,
          name: "UI/UX Developer",
          value: "ui-ux",
        },
      ],
      leavesRequested: [],
      show: false,
      selectedBatch: "all",
      type: "leave",
    };
  },
  methods: {
    toggleDialog() {
      this.show = !this.show;
    },
    selectBatch(value) {
      this.selectedBatch = value;
    },
    async getLeaveRequests() {
      try {
        const leaveRequests = await getRequests(this.type, this.selectedBatch);

        this.leavesRequested = [...leaveRequests.data.requests];
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  created() {
    this.getLeaveRequests();
  },
};
</script>

<style scoped>
section {
  padding: 1em 3em;
  width: 90%;
}

.select-wrapper {
  display: flex;
  justify-content: start;
}

.table-wrapper {
  height: 70vh;
  overflow: auto;
}

@media (max-width: 768px) {
  section {
    padding: 1em;
    overflow: auto;
  }

  header {
    text-align: center;
    margin-bottom: 2em;
  }
}
</style>
