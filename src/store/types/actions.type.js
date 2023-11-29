//auth-------------------------------------------
export const CHECK_AUTH = "checkAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_USER = "updateUser";
//common--------------------------------------
export const act_setting = {
  lock: 'ASLock',
  nav: 'ASNav',
  theme: 'AStheme',
}
//admin----------------------------------------
export const act_admin = {
  viewsearch: 'AAUsersViewSearch',
  users: {
    editID: 'AAUsersEditID',
    search: 'AAUsersSearch',
    query: 'AAUsersQuery',
    update: 'AAUsersUpdate',
    delete: 'AAUsersDelete',
    sustoggle: 'AAUsersSustogg',
  },
  groups: {
    editID: 'AAGroupsEditID',
    get: 'AAGroupsGet',
    create: 'AAGroupsCreate',
    update: 'AAGroupsUpdate',
    delete: 'AAGroupsDelete',
  },
  fields: {
    selectCatename: 'AAFieldsSelectCatename',
    setCEGroupID: 'AAFieldsSetCEgroupID',
    setCEFieldData: 'AAFieldsSetCEFieldData',
    group: {
      search: 'AAFieldsGroupSearch',
      getone: 'AAFieldsGroupGetone',
      create: 'AAFieldsGroupCreate',
      update: 'AAFieldsGroupUpdate',
      delete: 'AAFieldsGroupDelete',
    },
    field: {
      getone: 'AAFieldsFieldGetone',
      create: 'AAFieldsFieldCreate',
      update: 'AAFieldsFieldUpdate',
      delete: 'AAFieldsFieldDelete',
    }
  },
  tags: {
    editID: 'AATagsEditID',
    get: 'AATagsGet',
    update: 'AATagsUpdate',
    delete: 'AATagsDelete',
  }
}
export const act_user = {
  leads: {
    editId: 'AULeaseEditID',
    search: 'AULeadSearch',
    create: 'AULeadCreate',
    update: 'AULeadUpdate',
    delete: 'AULeadDelete',
    status: 'AULeadStatus'
  }
}
///////////////////////////////////////////////
