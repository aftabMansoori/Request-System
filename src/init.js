import "@/plugins";
import config from "./config";

// Register Global components, filters or any self created local modues here

import Vue from "vue";

import dateFilter from "@/filter/date";
import toCapitalised from "@/filter/capitalised";

import { AppLoader, AppSpinner, NoData } from "@/Components/utils";

// Global components
Vue.component("AppLoader", AppLoader);
Vue.component("AppSpinner", AppSpinner);
Vue.component("NoData", NoData);

Vue.prototype.$config = config;

Vue.filter("date", dateFilter);
Vue.filter("toCapitalised", toCapitalised);
