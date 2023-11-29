<template>
  <div class="md-layout text-center">
    <md-card class="login-page md-card-login" :class="{ 'md-card-hidden': cardHidden }">
      <md-card-header class="md-card-header-green">
        <h4 class="mb-0 pb-0 title">Log in</h4>
      </md-card-header>
      <md-card-content>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form ref="login_form" @submit.prevent="handleSubmit(submit)">
            <div class="md-layout create-field-group mt-3">
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <ValidationProvider
                  name="username"
                  rules="required|min:3"
                  v-slot="{ passed, failed }"
                >
                  <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <md-icon>face</md-icon>
                    <label>username</label>
                    <md-input v-model="username" type="text"> </md-input>
                    <md-icon class="error" v-show="failed">close</md-icon>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <ValidationProvider
                  name="password"
                  rules="required|min:6"
                  v-slot="{ passed, failed }"
                >
                  <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                    <md-icon>lock_outline</md-icon>
                    <label>password...</label>
                    <md-input v-model="password" type="password"> </md-input>
                  </md-field>
                </ValidationProvider>
              </div>
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-checkbox v-model="forget" slot="check">remember me</md-checkbox>
              </div>
              <md-progress-bar md-mode="indeterminate" v-if="sending" />
              <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                <md-button type="submit" class="md-success w-100">Log in</md-button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import { extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);

export default {
  name: 'login-form',
  components: {  },
  data() {
    return {
      cardHidden: false,
      username: null,
      password: null,
      forget: false,
      saved: false,
      sending: false,
    };
  },
  methods: {
    clearForm() {
      this.$refs.login_form.reset();
      this.username = null
      this.password = null
      this.forget = false
      this.saved = false
    },
    saveUser() {
      var _this = this
      this.sending = true
      // Instead of this timeout, here you can call your API
      window.setTimeout(function() {
        _this.saved = true
        _this.sending = false
        _this.clearForm()
        _this.$router.replace('/user')
      }, 1500)
    },
    submit() {
      this.saveUser();
    }
  }
};
</script>
<style lang="scss">
  .login-page .md-card-login .md-card-header
  .md-card-login .md-card-header {
    margin-bottom: 0;
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
