import ApiService from "@/common/api.service";
import { act_admin } from "../../types/actions.type";
import { mut_admin, SET_ERROR } from "../../types/mutations.type";
import {URLS} from '@/common/config.js'

const state = {
  error: null,
  categories: {
    Account: [],
    Campaign: [],
    Contact: [],
    Lead: [],
    Opportunity: []
  },
  selectCatename: null,
  ceGroupID: null,
  ceFieldData: {},
};

const getters = {
  adFieldsStates(state) {
    return state
  }
};
const actions = {
  [act_admin.fields.group.search](context, catename) {
    return new Promise((resolve, reject) => {
      ApiService.query(URLS.admin.fields.groups, 
        {key:'klass_name', query: context.state.selectCatename ? context.state.selectCatename : catename})
        .then(res => {
          if (res.msg) context.commit(SET_ERROR, res.msg)
          else if (res.data){
            if (!context.state.selectCatename) context.commit(mut_admin.fields.selectCatename, catename)
            context.commit(mut_admin.fields.setCategories, {catename, data: res.data});
          }
          resolve()
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  ////////////////////////////// group //////////////////////////////////////////////////////////
  [act_admin.fields.group.create](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post(URLS.admin.fields.groups, formData)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            ApiService.query(URLS.admin.fields.groups, 
              {key:'klass_name', query: context.state.selectCatename})
              .then(reget => {
                if (reget.msg) context.commit(SET_ERROR, res.msg)
                else if (reget.data) 
                  context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
                resolve()
              })
              .catch(err => {
                context.commit(SET_ERROR, err);
                reject(err)
              })
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.fields.group.update](context, {id, formData}) { 
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.admin.fields.groups}/${id}`, formData)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            ApiService.query(URLS.admin.fields.groups, 
              {key:'klass_name', query: context.state.selectCatename})
              .then(reget => {
                if (reget.msg) context.commit(SET_ERROR, res.msg)
                else if (reget.data) 
                  context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
                resolve()
              })
              .catch(err => {
                context.commit(SET_ERROR, err);
                reject(err)
              })
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.fields.group.delete](context, id) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.admin.fields.groups}/${id}/delete`)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            ApiService.query(URLS.admin.fields.groups, 
              {key:'klass_name', query: context.state.selectCatename})
              .then(reget => {
                if (reget.msg) context.commit(SET_ERROR, res.msg)
                else if (reget.data) 
                  context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
                resolve()
              })
              .catch(err => {
                context.commit(SET_ERROR, err);
                reject(err)
              })
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  //////////////////////////////////// field ///////////////////////////////////////////////////////////
  [act_admin.fields.field.create](context, formData) {
    return new Promise((resolve, reject) => {
      ApiService.post(URLS.admin.fields.field, formData)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            ApiService.query(URLS.admin.fields.groups, 
              {key:'klass_name', query: context.state.selectCatename})
              .then(reget => {
                if (reget.msg) context.commit(SET_ERROR, res.msg)
                else if (reget.data) 
                  context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
                resolve()
              })
              .catch(err => {
                context.commit(SET_ERROR, err);
                reject(err)
              })
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.fields.field.update](context, {id, formData}) { 
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.admin.fields.field}/${id}`, formData)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            ApiService.query(URLS.admin.fields.groups, 
              {key:'klass_name', query: context.state.selectCatename})
              .then(reget => {
                if (reget.msg) context.commit(SET_ERROR, res.msg)
                else if (reget.data) 
                  context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
                resolve()
              })
              .catch(err => {
                context.commit(SET_ERROR, err);
                reject(err)
              })
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  [act_admin.fields.field.delete](context, id) {
    return new Promise((resolve, reject) => {
      ApiService.post(`${URLS.admin.fields.field}/${id}/delete`)
        .then(res => {
          if (res.msg) {
            context.commit(SET_ERROR, res.msg)
            resolve()
          } else if (res.data) {
            ApiService.query(URLS.admin.fields.groups, 
              {key:'klass_name', query: context.state.selectCatename})
              .then(reget => {
                if (reget.msg) context.commit(SET_ERROR, res.msg)
                else if (reget.data) 
                  context.commit(mut_admin.fields.setCategories, {catename: context.state.selectCatename, data: reget.data});
                resolve()
              })
              .catch(err => {
                context.commit(SET_ERROR, err);
                reject(err)
              })
          }
        })
        .catch(err => {
          context.commit(SET_ERROR, err);
          reject(err)
        })
    })
  },
  /////////////////// none change state && only API //////////////////
  [act_admin.fields.selectCatename](context, catename) {
    context.commit(mut_admin.fields.selectCatename, catename)
  },
  [act_admin.fields.setCEGroupID](context, id) {
    context.commit(mut_admin.fields.setCEGroupID, id)
  },
  [act_admin.fields.setCEFieldData](context, data) {
    context.commit(mut_admin.fields.setCEFieldData, data)
  }
  //////////////////////////////////////////////////////////////////////
};

const mutations = {
  [SET_ERROR](state, error) {
    state.error = error;
  },
  [mut_admin.fields.selectCatename](state, catename) {
    state.selectCatename = catename
  },
  [mut_admin.fields.setCEGroupID](state, id) {
    state.ceGroupID = id
  },
  [mut_admin.fields.setCEFieldData](state, data) {
    if (data.add) {
      if (state.ceFieldData[data.gid]) {
        let key = Object.keys(data.add)
        state.ceFieldData[data.gid][key[0]] = Object.values(data.add)[0]
      } else Object.assign(state.ceFieldData, {[data.gid]: data.add})
    } else if (data.del) {
      delete state.ceFieldData[data.gid][data.del]
      if (!Object.keys(state.ceFieldData[data.gid]).length) delete state.ceFieldData[data.gid]
    }
  },
  [mut_admin.fields.setCategories](state, {catename, data}) {
    state.categories[catename] = data
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};