<template>
  <div class="form-lead-convert" v-if="open">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form ref="cf_form" :class="toggleOutline ? 'new-field' : 'edit-field'"
      @submit.prevent="handleSubmit(submit)">
        <div class="md-layout">
          <div class="md-layout-item">
            <small>By converting the lead Michael Jackson will become a contact associated with the existing or newly created account. Lead status will be automatically set to converted.</small>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="account"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
                <multiselect 
                  name="account"
                  v-model="data.account" 
                  placeholder="Add or Select account..."
                  :multiple="false" :taggable="true" 
                  :options="accounts" 
                >
                </multiselect>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="accounts"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
                <multiselect 
                  name="accounts"
                  v-model="data.account" 
                  placeholder="Assigned to..."
                  :multiple="false" :taggable="true" 
                  :options="accounts" 
                >
                </multiselect>
              </md-field>
            </ValidationProvider>
          </div>
          <br />
          <div class="md-layout-item">
            <strong>Opportunity</strong>
          </div>
          <md-divider class="md-hr md-theme-demo-light" />
          <div class="md-layout-item">
            <small>You can optionally create an opportunity for the Michael Jackson contact by specifying the name, current stage, estimated closing date, sale probability, amount of the deal, and the discount offered.</small>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="name"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label style="font-weight: 700;">Name</label>
                <md-input name='name' v-model="name" type="text"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50">
            <ValidationProvider
              name="stage"
              rules="required"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
                <multiselect 
                  name="stage"
                  v-model="data.stage" 
                  placeholder="Select Stage..."
                  :multiple="false" :taggable="true" 
                  :options="stage" 
                >
                </multiselect>
              </md-field>
            </ValidationProvider>
          </div>
          <br />
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <ValidationProvider
              name="date"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label style="font-weight: 700;">Cloase date</label>
                <date-picker :lang="lang"></date-picker>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <ValidationProvider
              name="prob"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label style="font-weight: 700;">Probability($)</label>
                <md-input name='prob' v-model="prob" type="number"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <ValidationProvider
              name="amount"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label style="font-weight: 700;">Amount($)</label>
                <md-input name='amount' v-model="amount" type="number"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
            <ValidationProvider
              name="discount"
              rules="required|min:3"
              v-slot="{ passed, failed }"
            >
              <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                <label style="font-weight: 700;">Discount($)</label>
                <md-input name='discount' v-model="discount" type="number"></md-input>
                <md-icon class="error" v-show="failed">close</md-icon>
                <md-icon class="success" v-show="passed">done</md-icon>
              </md-field>
            </ValidationProvider>
          </div>
          <br />
          
          
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <br />
          <div class="md-layout">
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50 float-left">
              <md-button type="submit" class="md-success w-100">Convert lead</md-button>
            </div>
            <div class="md-layout-item md-medium-size-50 md-xsmall-size-50 md-size-50 float-right">
              <md-button class="md-primary" :disabled="sending" @click="cancel">Cancel</md-button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {USER} from '@/common/config.js'
import DatePicker from 'vue2-datepicker';
import store from "@/store";
import { mapState, mapGetters} from "vuex"
import { act_admin } from "@/store/types/actions.type";
import { extend, Validator } from "vee-validate";
import { required, min, max, digits, between } from "vee-validate/dist/rules";
import 'vue2-datepicker/index.css';
// import 'vue2-datepicker/locale/zh-cn';

extend("required", required);
extend("min", min);
extend('max', max);
extend('digits', digits);
extend('between', between);
extend("diff", {
  computesRequired: true,
  validate: (value, {compare, dir}) => {
    if (dir) return Number(value) > Number(compare)
    else return Number(value) <= Number(compare)
  },
  params: ['compare', 'dir'],
  message: ""
});


export default {
  name: 'form-lead-convert',
  props: {
    gid: {
      type: Number,
      default: null
    },
    open: {
      type: Boolean,
      default: false
    },
    field: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(["adFieldsStates"]),
    wopen: props => props.open,
    wDataAs: data => data.data.as
  },
  watch: {
    wopen(newValue, oldValue) {
      if (newValue) {
        this.toggleOutline = this.$props.field.id === 'new' ? true : false
        this.data = this.$props.field
        let inx = Object.values(this.fieldAs).indexOf(this.data.as)
        if (inx > -1) this.data.as = Object.keys(this.fieldAs)[inx]
        else delete this.data.as
      }
    },
    wDataAs(newValue, oldValue) {
      this.show = this.horb[this.fieldAs[newValue]] ? false : true
    }
  },
  data() {
    return {
      toggleOutline: false,
      fieldAs: ADMIN_FIELD_AS,
      horb: AF_FORM_HIDDEN,
      show: true,
      data: {},
      saved: false,
      sending: false
    };
  },
  methods: {
    notifyVue({t, m, i, v, h, c}) {
      this.$notify({
        timeout: t || 2000,
        message: m || '',
        icon: i || "add_alert",
        horizontalAlign: h || 'center',
        verticalAlign: v || 'bottom',
        type: c
      });
    },
    clearForm() {
      this.$refs.cf_form.reset();
      this.data = {}
      this.saved = false
      this.sending = false
    },
    saveUser() {
      this.sending = true
      let keys = ['label', 'as', 'required', 'disabled', 'hint'];
      if (this.show) keys = keys.concat(['minlength', 'maxlength', 'placeholder']);
      let formData = new FormData(); 
      for (const k in this.data) {
        if (keys.find(m => m === k)) {
          if (k === 'as') formData.append(`field[${k}]`, this.fieldAs[this.data[k]]);
          else if (k === 'minlength' || k === 'maxlength') formData.append(`field[${k}]`, Number(this.data[k]));
          else if (k === 'required' || k === 'disabled') formData.append(`field[${k}]`, this.data[k] ? 1 : 0);
          else formData.append(`field[${k}]`, this.data[k]);
        }
      }
      formData.append(`field[field_group_id]`, this.$props.gid)
      Promise.all([
        this.data.id === 'new'
          ? store.dispatch(act_admin.fields.field.create, formData)
          : store.dispatch(act_admin.fields.field.update, {id: this.data.id, formData}),
        store.dispatch(act_admin.tags.get)
      ]).then(() => {
        this.notifyVue({
          m: `${this.data.id === 'new' ? 'Create' : 'Update'} ${JSON.stringify(this.data.label)} field!`, c: 'success'
        })
      }).catch(err=> {
        this.notifyVue({
          t: 2500, m: `Failed to ${this.data.id ? 'Create' : 'Update'} ${JSON.stringify(this.data.label)} field...`, 
          c: 'warning', v: 'top', h: 'left'
        })
        this.$emit('closeCEFieldModal')
        this.clearForm()
      })
    },
    submit() {
      this.saveUser();
    },
    cancel() {
      this.$emit('closeCEFieldModal')
      this.clearForm()
    }
  }
};
</script>
<style lang="scss">
  .form-lead-convert {
    .new-field {
      outline: solid 2px green;
    }
    .edit-field {
      outline: dashed 1px darkgrey
    }
    .md-progress-bar {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
    }
  }
</style>



        
