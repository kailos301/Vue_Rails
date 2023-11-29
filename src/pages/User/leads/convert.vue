<template>
<div class="d-block text-center lead-convert">
  <ValidationObserver v-slot="{ handleSubmit }">
    <form ref="pend_form" @submit.prevent="handleSubmit(submit)">
      <div class="pend-form">
        <div class="md-layout auth-info">
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="first_name"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>User Name</label>
                <md-input v-model="first_name" type="text"> </md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="last_name"
              rules="required"
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
              name="phone"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
              <label>Phone</label>
              <md-input v-model="phone" type="password"> </md-input>

              <md-icon class="error" v-show="failed">close</md-icon>
              <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="password"
              rules="required|confirmed:confirmpass|min:5"
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
              rules="required"
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
          <md-checkbox v-model="checkadmin"><a>The user is Administrator.</a></md-checkbox>
        </div>
        <h5 class="title">Personal Information</h5>
        <div class="md-layout pers-info">
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="firstname"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>First Name</label>
                <md-input v-model="firstname" type="text"> </md-input>

                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="lastname"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>Last Name</label>
                <md-input v-model="lastname" type="text"> </md-input>

                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="title"
              rules="required"
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
              rules="required"
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
            <ValidationProvider
                name="groups"
                rules="required"
                v-slot="{ passed, failed }"
              >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label>Groups</label>
                <md-input v-model="groups" type="text"> </md-input>

                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
        </div>
      </div>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
        <md-button type="submit" class="md-success" :disabled="sending">Create/Edit user</md-button>
      </div>
      <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
        <md-button class="md-danger" :disabled="sending" @click="cancel">Cancel</md-button>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { extend } from "vee-validate";
import { required, email, confirmed, min } from "vee-validate/dist/rules";
extend("email", email);
extend("required", required);
extend("confirmed", confirmed);
extend("min", min);
export default {
  name: "convert-lead",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirmpass: null,
      checkadmin: false,
      firstname: null,
      lastname: null,
      title: null,
      company: null,
      groups: null,
      sending: false,
      saved: true,
    }
  },
  methods: {
    clearForm() {
      this.$refs.pend_form.reset()
      this.username = null
      this.email = null
      this.password = null
      this.confirmpass = null
      this.firstname = null
      this.lastname = null
      this.title = null
      this.company = null
      this.groups = null
    },
    saveUser() {
      var _this = this
      this.sending = true
      // Instead of this timeout, here you can call your API
      window.setTimeout(function() {
        _this.saved = true
        _this.sending = false
        _this.clearForm()
        _this.$bvModal.hide('editUserModal');
      }, 1500)
    },
    submit() {
      /////////// API //////////////////////////
      this.saveUser();
    },
    cancel() {
      this.clearForm();
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