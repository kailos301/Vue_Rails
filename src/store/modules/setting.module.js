import { act_setting } from "../types/actions.type";
import { mut_setting } from "../types/mutations.type";

const state = {
  lock: false,
  nav: 'user',
  theme: {
    sidebarMini: true,
    sidebarImg: false,
    sidebarColors: [
      { color: 'gray', active: false },
      { color: 'black', active: true },
      { color: "purple", active: false },
      { color: "azure", active: false },
      { color: "green", active: false },
      { color: "orange", active: false },
      { color: "rose", active: false },
      { color: "danger", active: false }
    ],
    sidebarBgs: [
      { colorBg: "black", active: true },
      { colorBg: "white", active: false },
      { colorBg: "red", active: false }
    ],
    sidebarImages: [
      { image: "./img/sidebar-1.jpg", active: false },
      { image: "./img/sidebar-2.jpg", active: true },
      { image: "./img/sidebar-3.jpg", active: false },
      { image: "./img/sidebar-4.jpg", active: false }
    ]
  }
};

const getters = {
  settingState(state) {
    return state
  }
};
const actions = {
  /////////////////// none change state && only API //////////////////
  [act_setting.lock](context) {
    context.commit(mut_setting.lock)
  },
  [act_setting.nav](context) {
    context.commit(mut_setting.nav)
  },
  [act_setting.theme](context, params) {
    context.commit(mut_setting.theme, params)
  },
  //////////////////////////////////////////////////////////////////////
};

const mutations = {
  [mut_setting.lock](state) {
    state.lock = !state.lock
  },
  [mut_setting.nav](state) {
    state.nav = state.nav === 'user' ? 'admin' : 'user'
  },
  [mut_setting.theme](state, params) {
    Object.assign(state.theme, params)
    window.localStorage.setItem('theme', state.theme);
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};