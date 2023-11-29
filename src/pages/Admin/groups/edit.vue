<template>
 <b-modal id="editGroupModal" 
    hide-footer hide-header-close size='lg'
    @hidden="restEditID"
  >
    <template #modal-title>{{id ? 'Edit Group' : 'Create Group'}}</template>
    <div class="d-block text-center group-edit">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="cf_form" @submit.prevent="handleSubmit(submit)">
          <div class="md-layout create-field-group mt-3">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
              <ValidationProvider
                name="name"
                :rules="`required|min:${minlen.group ? minlen.group : 5}`"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Group name</label>
                  <md-input v-model="name" type="text"> </md-input>
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </md-field>
              </ValidationProvider>
            </div>
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
              <label class="typo__label">Select users</label>
              <multiselect ref="g_select" v-model="ins" 
                placeholder="Search user" 
                label="username" track-by="id" 
                :multiple="true" :taggable="true" 
                :options="users" 
              >
              </multiselect>
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
import { required, min } from "vee-validate/dist/rules";

extend("required", required);
extend("min", min);

export default {
  name: 'edit-group',
  computed: mapState({
    ...mapGetters(["adUsersStates", "adGroupsStates"]),
    editID: state => state.adminGroups.editID,
  }),
  watch: {
    editID(newValue, oldValue) {
      if (newValue !== -1) {
        this.users = this.$store.getters.adUsersStates.users.map((u, i) => {
          return {id: u.id, username: u.username, email: u.email}
        })
        let group = this.$store.getters.adGroupsStates.groups.find(k => k.id === newValue)
        if (group) {
          group = JSON.parse(JSON.stringify(group))
          this.id = group.id
          this.name = group.name
          this.ins = group.users.map((u, i)=> {
            return {id: u.id, username: u.username, email: u.email}
          })
        } else {
          this.id = null
          this.name = null
          this.ins = []
        }
        this.$bvModal.show('editGroupModal');
      }
    },
  },
  data() {
    return {
      minlen: MIN_LEN,
      id: null,
      name: null,
      ins: [],
      users: [],

      saved: false,
      sending: false
    };
  },
  methods: {
    restEditID() {
      store.dispatch(act_admin.groups.editID, -1)
    },
    clearForm() {
      this.$refs.cf_form.reset()
      this.id = null
      this.name = null
      this.ins = []
      this.users = []

      this.sending = false
      this.saved = false
    },
    submit() {
      this.sending = true
      let formData = new FormData()
      formData.append('name', this.name)
      if (Array.isArray(this.ins)) {
        let tmp = this.ins.map((u, i) => {
          return u.id
        })
        formData.append('users', tmp)
      }
      Promise.all([
        store.dispatch(act_admin.groups.update, {formData, id: this.id}),
      ]).then(() => {
        Promise.all([
          store.dispatch(act_admin.groups.get)
        ]).then(() => {
          this.clearForm()
          this.saved = true
          this.$bvModal.hide('editGroupModal');
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
      this.clearForm()
      this.$bvModal.hide('editGroupModal');
    }
  },
};
</script>
<style lang="scss">
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>



        
