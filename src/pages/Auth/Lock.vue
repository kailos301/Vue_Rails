<template>
  <div class="md-layout text-center">
    <div class="md-layout-item md-size-50 md-small-size-100">
      <md-card class="md-card-profile" :class="{ 'md-card-hidden': cardHidden }">
        <md-card-header>
          <div class="md-card-avatar">
            <img class="img" :src="image" />
          </div>
        </md-card-header>
        <md-card-content>
          <h4 class="title" style="margin-top: 0; margin-bottom: 0;">Tania Andrew</h4>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form ref="lock_form" @submit.prevent="handleSubmit(submit)">
              <div class="md-layout mt-3">
                <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                  <ValidationProvider
                    name="password"
                    rules="required|min:6"
                    v-slot="{ passed, failed }"
                  >
                    <md-field class="md-form-group" :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                      <md-icon>{{settingState.lock ? 'lock_open' : 'lock_outline'}}</md-icon>
                      <label>password...</label>
                      <md-input v-model="password" type="password"></md-input>
                    </md-field>
                  </ValidationProvider>
                </div>
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
                <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
                  <md-button type="submit" class="md-round" :class="settingState.lock ? 'md-success' : 'md-primary'">
                    {{settingState.lock ? 'Unlock' : 'Lock'}}
                  </md-button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import {mapState, mapGetters} from "vuex";
import { extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import {act_setting} from "@/store/types/actions.type";

extend("required", required);
extend("min", min);
export default {
  computed: {
    ...mapGetters(["settingState"])
  },
  data() {
    return {
      cardHidden: false,
      password: null,
      image: "./img/faces/avatar.jpg",
      sending: false,
      saved: false,
    };
  },
  methods: {
    clearForm() {
      this.$refs.lock_form.reset();
      this.password = null
      this.sending = false
      this.saved = false
    },
    saveUser() {
      this.sending = true
      Promise.all([
        store.dispatch(act_setting.lock)
      ]).then(() => {
        this.clearForm()
      })
    },
    submit() {
      this.saveUser();
    }
  }
};
</script>
<style></style>
