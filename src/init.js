import "@/plugins";

// Register Global components, filters or any self created local modues here

import Vue from "vue";

import dateFilter from "@/filter/date";

Vue.filter("date", dateFilter);
