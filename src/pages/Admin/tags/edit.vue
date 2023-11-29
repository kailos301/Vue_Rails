<template>
 <b-modal id="editTagModal" 
    hide-footer hide-header-close size='lg'
    @hidden="restEditID"
  >
    <template #modal-title>{{id ? 'Edit Tag' : 'Create Tag'}}</template>
    <div class="d-block text-center tag-edit">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form ref="at_form" @submit.prevent="handleSubmit(submit)">
          <div class="md-layout create-field-tag mt-3">
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
              <ValidationProvider
                name="name"
                :rules="`required|min:${minlen.tag ? minlen.tag : 5}`"
                v-slot="{ passed, failed }"
              >
                <md-field :class="[{ 'md-error': failed }, { 'md-valid': passed }]">
                  <label>Tag name</label>
                  <md-input v-model="name" type="text"> </md-input>
                  <md-icon class="error" v-show="failed">close</md-icon>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </md-field>
              </ValidationProvider>
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
    ...mapGetters(["adTagsStates"]),
    editID: state => state.adminTags.editID,
  }),
  watch: {
    editID(newValue, oldValue) {
      if (newValue !== -1) {
        let group = this.$store.getters.adTagsStates.tags.find(k => k.id === newValue)
        if (group) {
          group = JSON.parse(JSON.stringify(group))
          this.id = group.id
          this.name = group.name
        } else {
          this.id = null
          this.name = null
        }
        this.$bvModal.show('editTagModal');
      }
    },
  },
  data() {
    return {
      minlen: MIN_LEN,
      id: null,
      name: null,

      saved: false,
      sending: false
    };
  },
  methods: {
    restEditID() {
      store.dispatch(act_admin.tags.editID, -1)
    },
    clearForm() {
      this.$refs.at_form.reset()
      this.id = null
      this.name = null

      this.sending = false
    },
    submit() {
      this.sending = true
      let formData = new FormData()
      formData.append('name', this.name)
      Promise.all([
        store.dispatch(act_admin.tags.update, {formData, id: this.id}),
      ]).then(() => {
        Promise.all([
          store.dispatch(act_admin.tags.get)
        ]).then(() => {
          this.clearForm()
          this.saved = true
          this.$bvModal.hide('editTagModal');
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
      this.$bvModal.hide('editTagModal');
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



        
