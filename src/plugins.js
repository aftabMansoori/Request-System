import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import Vuelidate from "vuelidate";
import ElementUI from "element-ui";
import Toast from "vue-toastification";

import "element-ui/lib/theme-chalk/index.css";
import "./global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import locale from "element-ui/lib/locale/lang/en";
import "vue-toastification/dist/index.css";
// import "./darkmode.css";

Vue.config.lang = "en";

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(Vuelidate);
Vue.use(ElementUI, { locale });

Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
});
