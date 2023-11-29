import { act_admin } from "../../types/actions.type";
import { mut_admin } from "../../types/mutations.type";

const state = {
  viewsearch: true,
};

const getters = {
  adGlobalStates(state) {
    return state
  }
};
const actions = {
  [act_admin.viewsearch](context, credentials) {
    context.commit(mut_admin.viewsearch, credentials)
  },
};

const mutations = {
  [mut_admin.viewsearch](state, viewsearch) {
    state.viewsearch = viewsearch
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};