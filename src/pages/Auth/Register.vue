<template>
  <div class="md-layout text-center">
    <md-card class="sign-page md-card-signup">
      <md-card-header class="md-card-header-green">
        <h5 class="mb-0 pb-0 title">Register</h5>
      </md-card-header>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-size-30 md-medium-size-30 md-small-size-100 ml-0 text-center">
            <img :src="avatar" class="picture-src" title="" />
            <input ref="avatar" type="file" style="visibility: hidden;" @change="onFileChange"/>
            <h5 class="description text-center choose-file" @click="openExplore">Choose Picture</h5>
          </div>
          <div class="md-layout-item md-size-70 md-medium-size-70 md-small-size-100 mr-0">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form ref="signup_form" @submit.prevent="handleSubmit(submit)">
                <div class="md-layout create-field-group mt-3">
                  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                    <ValidationProvider
                      name="username"
                      rules="required|min:3"
                      v-slot="{ passed, failed }"
                    >
                      <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                        <md-icon>face</md-icon>
                        <label>Username</label>
                        <md-input v-model="username" type="text"> </md-input>
                        <md-icon class="error" v-show="failed">close</md-icon>
                        <md-icon class="success" v-show="passed">done</md-icon>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                    <ValidationProvider
                      name="email"
                      rules="required|email"
                      v-slot="{ passed, failed }"
                    >
                      <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                        <md-icon>email</md-icon>
                        <label>Email</label>
                        <md-input v-model="email" type="text"> </md-input>
                        <md-icon class="error" v-show="failed">close</md-icon>
                        <md-icon class="success" v-show="passed">done</md-icon>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                    <ValidationProvider
                      name="password"
                      rules="required|min:6|confirmed:confirmpass"
                      v-slot="{ passed, failed }"
                    >
                      <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                        <md-icon class="error" v-show="failed" style="display: block; left: 0;">lock_outline</md-icon>
                        <md-icon class="success" v-show="passed" style="display: block; left: 0;">lock_open</md-icon>
                        <label>Password...</label>
                        <md-input v-model="password" type="password" style="margin-left: 37px;"> </md-input>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                    <ValidationProvider
                      name="confirmpass"
                      rules="required|min:6|confirmed:password"
                      v-slot="{ passed, failed }"
                    >
                      <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                        <md-icon class="error" v-show="failed" style="display: block; left: 0;">lock_outline</md-icon>
                        <md-icon class="success" v-show="passed" style="display: block; left: 0;">lock_open</md-icon>
                        <label>Confirm password...</label>
                        <md-input v-model="confirmpass" type="password" style="margin-left: 37px;"> </md-input>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <md-progress-bar md-mode="indeterminate" v-if="sending" />
                  <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                    <md-button type="submit" class="md-success w-100">Get started</md-button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import { extend } from "vee-validate";
import { required, min, email, confirmed, regex } from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);
extend("email", email);
extend("confirmed", confirmed);

export default {
  name: 'signup-from',
  components: {  },
  data() {
    return {
      avatar: "./img/default-avatar.png",
      file: null,
      username: null,
      email: null,
      password: null,
      confirmpass: null,
      saved: false,
      sending: false,
    };
  },
  methods: {
    openExplore() {
      this.$refs.avatar.click();
    },
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length !== 1 ) return;
      else if (!new RegExp('image').exec(files[0].type)) return;
      this.file = files[0]
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;
      reader.onload = e => {
        vm.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    clearForm() {
      this.$refs.signup_form.reset();
      this.file = null
      this.username = null
      this.email = null
      this.password = null
      this.confirmpass = null
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
      }, 1500)
    },
    submit() {
      this.saveUser();
    }
  }
};
</script>
<style lang='scss'>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .sign-page {
    .choose-file:hover {
      cursor: pointer;
    }
  }
</style>
