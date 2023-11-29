<template>
  <b-modal id="editUserModal" 
    hide-footer hide-header-close size='lg'
    @hidden="restEditID"
  >
    <template #modal-title>{{id ? 'Edit User' : 'Create User'}}</template>
    <div class="d-block text-center user-edit">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="edit_form" @submit.prevent="handleSubmit(submit)">
          <div class="user-info">
            <div class="md-layout auth-info">
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="username"
                  :rules="'required|min:'+minlen.name"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>User Name</label>
                    <md-input v-model="username" type="text"> </md-input>

                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Email Adress</label>
                  <md-input v-model="email" type="email"> </md-input>

                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="password"
                  :rules="'required|confirmed:confirmpass|min:'+minlen.pass"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Password</label>
                  <md-input v-model="password" type="password"> </md-input>

                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  vid="confirmpass"
                  :rules="'required|confirmed:password|min:'+minlen.pass"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Confirm Password</label>
                  <md-input v-model="confirmpass" type="password"> </md-input>

                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <md-checkbox v-model="admin"><a>The user is Administrator.</a></md-checkbox>
            </div>
            <h5 class="title">Personal Information</h5>
            <div class="md-layout pers-info">
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="first_name"
                  :rules="'required|min:'+minlen.name"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>First Name</label>
                    <md-input v-model="first_name" type="text"> </md-input>

                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="last_name"
                  :rules="'required|min:'+minlen.name"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>Last Name</label>
                    <md-input v-model="last_name" type="text"> </md-input>

                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="title"
                  :rules="'required|min:'+minlen.title"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>Title</label>
                    <md-input v-model="title" type="text"> </md-input>

                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
                <ValidationProvider
                  name="company"
                  :rules="'required|min:'+minlen.company"
                  v-slot="{ passed, failed }"
                >
                  <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <label>Company</label>
                    <md-input v-model="company" type="text"> </md-input>

                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div> 
            </div>
            <h4 class="title">Group Memberships</h4>
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <label class="typo__label">Select groups</label>
                <multiselect ref="aueg_select" v-model="groups" 
                  placeholder="Search group" 
                  label="name" track-by="id" 
                  :options="adGroupsStates.groups.map((g, i) => {
                    return {id: g.id, name: g.name, created_at: g.created_at, updated_at: g.updated_at}
                  })" 
                  :multiple="true" :taggable="true" 
                >
                </multiselect>
              </div>
            </div>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <div class="md-layout">
             <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
              <md-button type="submit" class="md-success md-dense" :disabled="sending"
                v-html="id ? 'Update' : 'Create'"
              />
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
              <md-button class="md-danger md-dense" :disabled="sending" @click="cancel">Cancel</md-button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </b-modal>
</template>
<script>
import {MIN_LEN} from '@/common/config'
import { mapState, mapGetters} from 'vuex';
import store from "@/store";
import { act_admin } from "@/store/types/actions.type";
import { extend } from "vee-validate";
import { required, email, confirmed, min } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("confirmed", confirmed);
extend("min", min);

export default {
  name: "edit-user",
  computed: mapState({
    editID: state => state.adminUsers.editID,
    ...mapGetters(["adGroupsStates"]),
  }),
  watch: {
    editID(newValue, oldValue) {
      if (newValue !== -1) {
        let user = this.$store.getters.adUsersStates.users.find(k => k.id === newValue)
        if (user) {
          user = JSON.parse(JSON.stringify(user))
          this.id = user.id
          user.username ? this.username = user.username : this.username = null
          user.email ? this.email = user.email : this.email = null
          user.password ? this.password = user.password : this.password = null
          user.admin ? this.admin = user.admin : this.admin = false
          user.first_name ? this.first_name = user.first_name : this.first_name = null
          user.last_name ? this.last_name = user.last_name : this.last_name = null
          user.title ? this.title = user.title : this.title = null
          user.company ? this.company = user.company : this.company = null
          Array.isArray(user.groups) ? this.groups = user.groups : this.groups = []
        } else {
          this.id = null
          this.username = null
          this.email = null
          this.password = null
          this.admin = false
          this.first_name = null
          this.last_name = null
          this.title = null
          this.company = null
          this.groups = []
        }
        this.confirmpass = null
        this.$bvModal.show('editUserModal');
      }
    }
  },
  data() {
    return {
      minlen: MIN_LEN,
      sending: false,
      saved: true,

      id: null,
      username: null,
      email: null,
      password: null,
      confirmpass: null,
      admin: false,
      first_name: null,
      last_name: null,
      title: null,
      company: null,
      groups: [],
    }
  },
  methods: {
    restEditID() {
      store.dispatch(act_admin.users.editID, -1)
    },
    clearForm() {
      this.$refs.edit_form.reset()
      this.id = null
      this.username = null
      this.email = null
      this.password = null
      this.confirmpass = null
      this.admin = false
      this.first_name = null
      this.last_name = null
      this.title = null
      this.company = null
      this.groups = []

      this.sending = false
    },
    submit() {
      this.sending = true
      let formData = new FormData()
      formData.append('username', this.username)
      formData.append('email', this.email)
      formData.append('password', this.password)
      formData.append('confirmpass', this.confirmpass)
      formData.append('admin', this.admin)
      formData.append('first_name', this.first_name)
      formData.append('last_name', this.last_name)
      formData.append('title', this.title)
      formData.append('company', this.company)
      if (Array.isArray(this.groups)) {
        let tmp = this.groups.map((g, i) => {
          return g.id
        })
        formData.append('groups', tmp)
      }
      Promise.all([
        store.dispatch(act_admin.users.update, {formData, id: this.id}),
      ]).then(() => {
        Promise.all([
          store.dispatch(act_admin.users.search),
          store.dispatch(act_admin.groups.get)
        ]).then(() => {
          this.clearForm()
          this.saved = true
          this.$bvModal.hide('editUserModal');
        }).catch(err => {
          
          this.saved = false
          this.sending = false
        })
      }).catch(err=> {
        
        this.saved = false
        this.sending = false
      })
    },
    cancel() {
      this.clearForm();
      this.saved = false
      this.$bvModal.hide('editUserModal');
    }
  }
}
</script>
<style lang="scss">
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
