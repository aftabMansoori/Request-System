import "@/init";
import Vue from "vue";
import router from "./Router";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
