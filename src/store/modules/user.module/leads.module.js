import ApiService from "@/common/api.service";
import { act_user } from "../../types/actions.type";
import { mut_user, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'

const state = {
  error: null,
  leads: [],
  lead: {
    info: {},
    tasks: [],
    histories: [],
  },
  editID: -1,
  keyword: ''
};

const getters = {
  urLeadsStates(state) {
    return state
  }
};
const actions = {
  [act_user.leads.search](context, keyword) {
    return new Promise((resolve, reject) => {
      ApiService.query(URLS.user.leads, 
        {key:'query', query: context.state.keyword})
        .then(res => {
          if (res.msg) context.commit(SET_ERROR, res.msg)
          else if (res.data){
            context.commit(mut_user.leads.getall,  res.data);
          }
          resolve()
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_user.leads.status](context, {status, id}) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.user.leads}/${id}/${status}`)
        .then(res => {
          if (res.msg) context.commit(SET_ERROR, res.msg)
          else if (res.data){
            resolve(res.data)
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },

  [act_user.leads.delete](context, id) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.user.leads}/${id}/delete`)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            resolve(res.data)
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err.data.errors);
          reject(err)
        })
    })
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_user.leads.getall](state, data) {
    state.leads = JSON.parse(data.data)
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};