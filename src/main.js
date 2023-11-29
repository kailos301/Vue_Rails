// =========================================================
// * Vue Material Dashboard PRO - v1.4.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";
import store from "./store";
// Plugins
import App from "./App.vue";
import Chartist from "chartist";
import { ModalPlugin } from 'bootstrap-vue'

// router setup
import routes from "./routes/routes";
// service
import ApiService from "./common/api.service";

// plugin setup
Vue.use(ModalPlugin)
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active"
});
router.beforeEach((from, to, next) => {
  Promise.all([
  ]).then(() => {
    if (!store.getters.settingState.lock) {
      next()
    }
  });
})
// Apiservice init
ApiService.init();
// global library setup
Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
