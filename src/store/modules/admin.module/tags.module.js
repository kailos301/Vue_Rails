import ApiService from "@/common/api.service";
import { act_admin } from "../../types/actions.type";
import { mut_admin, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'


const state = {
  error: null,
  tags: [],
  editID: -1,
};

const getters = {
  adTagsStates(state) {
    return state
  }
};
const actions = {
  [act_admin.tags.get](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.get(URLS.admin.tags)
        .then(res => {
          // if (res.msg) context.commit(SET_ERROR, res.msg)
          // else if (res.data) context.commit(mut_admin.tags.get, JSON.parse(res.data));
          if (res.data.msg) context.commit(SET_ERROR, res.data.msg)
          else if (res.data.data) context.commit(mut_admin.tags.get, JSON.parse(res.data.data));
          resolve()
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.tags.editID](context, credentials) {
    context.commit(mut_admin.tags.editID, credentials);
  },
  /////////////////// none change state && only API //////////////////
  [act_admin.tags.update](context, {formData, id}) {
    return new Promise((resolve, reject) => {
      ApiService.post(id ? `${URLS.admin.tags}/${id}` : URLS.admin.tags, formData)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.tags.delete](context, id=null) {
    return new Promise((resolve, reject) => {
      id 
        ? ApiService.post(`${URLS.admin.tags}/${id}/delete`)
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
  //////////////////////////////////////////////////////////////////////
};

const mutations = {
  [mut_admin.tags.editID](state, editID) {
    state.editID = editID
  },
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_admin.tags.get](state, tags) {
    state.tags = tags
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};