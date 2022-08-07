import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

import Vuelidate from "vuelidate";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
import "./global.css";
import "@fortawesome/fontawesome-free/css/all.css";
import locale from "element-ui/lib/locale/lang/en";
// import "./darkmode.css";

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.use(Vuelidate);
Vue.use(ElementUI, { locale });

Vue.config.lang = "en";
