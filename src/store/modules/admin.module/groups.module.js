import ApiService from "@/common/api.service";
import { act_admin } from "../../types/actions.type";
import { mut_admin, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'

const state = {
  error: null,
  groups: [],
  group: {},
  editID: -1,
};

const getters = {
  adGroupsStates(state) {
    return state
  }
};
const actions = {
  [act_admin.groups.get](context, credentials) {
    return new Promise((resolve, reject) => {
      credentials === undefined || credentials === null || credentials === ''
        ? ApiService.get(URLS.admin.groups)
            .then(res => {
              context.commit(mut_admin.groups.getall, res.data);
              resolve(res.data)
            })
            .catch(err => {
              context.commit(SET_ERROR, err);
              reject(err)
            })
        : ApiService.get(`${URLS.admin.groups}/${credentials}`)
            .then(res => {
              context.commit(mut_admin.groups.getone, res.data);
              resolve(res.data)
            })
            .catch(err => {
              context.commit(SET_ERROR, err);
              reject(err)
            })
    })
  },
  [act_admin.groups.editID](context, credentials) {
    context.commit(mut_admin.groups.editID, credentials);
  },
  /////////////////// none change state && only API //////////////////
  [act_admin.groups.update](context, {formData, id}) {
    return new Promise((resolve, reject) => {
      ApiService.post(id ? `${URLS.admin.groups}/${id}` : URLS.admin.groups, formData)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.groups.delete](context, id=null) {
    return new Promise((resolve, reject) => {
      id 
        ? ApiService.post(`${URLS.admin.groups}/${id}/delete`)
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
  [mut_admin.groups.editID](state, editID) {
    state.editID = editID
  },
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_admin.groups.getall](state, groups) {
    state.groups = groups
  },
  [mut_admin.groups.getone](state, group) {
    state.group = group
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};