import ApiService from "@/common/api.service";
import { act_admin } from "../../types/actions.type";
import { mut_admin, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'


const state = {
  error: null,
  users: [],
  query: null,
  editID: -1,
};

const getters = {
  adUsersStates(state) {
    return state
  }
};
const actions = {
  [act_admin.users.search](context, credentials) {
    return new Promise((resolve, reject) => {
      let query = context.getters.adUsersStates.query
      query === undefined || query === null || query === ''
        ? ApiService.get(URLS.admin.users)
            .then(res => {
              context.commit(mut_admin.users.set, res.data);
              resolve(res.data)
            })
            .catch(err => {
              context.commit(SET_ERROR, err);
              reject(err)
            })
        : ApiService.query(URLS.admin.users, {key: 'query', query})
            .then(res => {
              context.commit(mut_admin.users.set, res.data);
              resolve(res.data)
            })
            .catch(err => {
              context.commit(SET_ERROR, err);
              reject(err)
            })
    })
  },
  [act_admin.users.query](context, credentials) {
    credentials === undefined || credentials === null || credentials === ''
      ? context.commit(mut_admin.users.query, null)
      : context.commit(mut_admin.users.query, credentials);
  },
  [act_admin.users.editID](context, credentials) {
    context.commit(mut_admin.users.editID, credentials);
  },
  /////////////////// none change state && only API //////////////////
  [act_admin.users.update](context, {formData, id}) {
    return new Promise((resolve, reject) => {
      ApiService.post(id ? `${URLS.admin.users}/${id}` : URLS.admin.users, formData)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.users.delete](context, id=null) {
    return new Promise((resolve, reject) => {
      id 
        ? ApiService.post(`${URLS.admin.users}/${id}/delete`)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            context.commit(SET_ERROR, err);
            reject(err)
          })
        : resolve()
    })
  },
  [act_admin.users.sustoggle](context, {id, suspend_at}) {
    return new Promise((resolve, reject) => {
      let slug = suspend_at ? 'reactivate' : 'suspend'
      id 
        ? ApiService.post(`${URLS.admin.users}/${id}/${slug}`)
            .then(res => {
              resolve(res.data)
            })
            .catch(err => {
              context.commit(SET_ERROR, err);
              reject(err)
            })
        : resolve()
    })
  },
  ////////////////////////////////////////////////////////////////////
};

const mutations = {
  [mut_admin.users.editID](state, editID) {
    state.editID = editID
  },
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_admin.users.set](state, users) {
    state.users = users
  },
  [mut_admin.users.query](state, query) {
    state.query = query
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};