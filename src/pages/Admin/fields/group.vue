<template>
  <div class="fields-group">
    <div>
      <div>
        <div class="d-flex justify-content-between align-baseline"
          @mouseover="btToggle = true" @mouseleave="btToggle = false"
        >
          <h5 style="margin-bottom: 0; color: black; font-weight: 700" v-html="group.name" />
          <div class="md-group" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
            <md-button class="md-info" style="padding: 0;" @click="editGroup">EDIT GROUP</md-button>
            <md-button :class="openModal ? 'md-primary' : 'md-success'" style="padding: 0;" @click="toggleCEField">
              {{openModal ? 'Cancel Field' : 'New Field'}}
            </md-button>
            <md-button class="md-danger" style="padding: 0;" @click="deleteGroup">DELETE?</md-button>
          </div>
        </div>
        <md-divider class="md-hr md-theme-demo-light"></md-divider>
      </div>
      <div v-for="(field, n) in group.fields" :key="`agff-${n}`">
        <Field :gid="group.id ? String(group.id) : null" :field="field" />
        <md-divider class="md-hr md-theme-demo-light"></md-divider>
      </div>
    </div>
    <md-divider class="md-hr md-theme-demo-light"></md-divider>
    <CreateEditField 
      :openModal="openModal" 
      :gid="Number(group.id)"
      :field="adFieldsStates.ceFieldData[group.id] && adFieldsStates.ceFieldData[group.id]['new'] 
        ? adFieldsStates.ceFieldData[group.id]['new'] : {id: 'new'}"
      @closeCEFieldModal="toggleCEField" />
    <br/>
  </div>
</template>

<script>
  import store from "@/store";
  import { mapState, mapGetters} from "vuex"
  import { act_admin } from "@/store/types/actions.type";
  import Field from './field.vue'
  import CreateEditField from './createEditField.vue'
  import Swal from "sweetalert2";

  export default {
    name: 'fields-group',
    props: {
      group: {
        type: Object,
        default: () => {
          return {fields: []}
        }
      }
    },
    computed: {
      ...mapGetters(["adFieldsStates"]),
    },
    components:{
      Field,
      CreateEditField
    },
    beforeUpdate() {
      let seed = store.getters.adFieldsStates.ceFieldData
      this.openModal = seed[this.$props.group.id] && seed[this.$props.group.id]["new"] ? true : false
    },
    data() {
      return {
        btToggle: false,
        openModal: false
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
      editGroup() {
        Promise.all([
          store.dispatch(act_admin.fields.setCEGroupID, this.$props.group.id),
        ]).then(() => {
          this.$bvModal.show('ceGroupModal');
        })
      },
      deleteGroup() {
        let orglabel = JSON.stringify(this.$props.group.label)
        Swal.fire({
          title: 'Are you sure?',
          text: `Not be able to recover ${orglabel} group!`,
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            Promise.all([
              store.dispatch(act_admin.fields.group.delete, this.$props.group.id),
              store.dispatch(act_admin.tags.get)
            ]).then(() => {
              this.notifyVue({m: `Deleted ${orglabel} group!`, c: 'success'})
            }).catch(err=> {
              this.notifyVue({t: 2500, m: `Failed to delete ${orglabel} group...`, c: 'warning', v: 'top', h: 'left'})
            })
          }
        })
      },
      toggleCEField() {
        let data = {gid: this.$props.group.id}
        let seed = store.getters.adFieldsStates.ceFieldData
        seed[this.$props.group.id] && seed[this.$props.group.id]["new"] 
          ? Object.assign(data, {del: 'new'}) 
          : Object.assign(data, {add: {new: {id: 'new'}}})
        Promise.all([
          store.dispatch(act_admin.fields.setCEFieldData, data)
        ]).then(() => {
          seed = store.getters.adFieldsStates.ceFieldData
          this.openModal = seed[this.$props.group.id] && seed[this.$props.group.id]["new"] ? true : false
        })
      },
    },
  };
</script>
<style lang="scss">
</style>
