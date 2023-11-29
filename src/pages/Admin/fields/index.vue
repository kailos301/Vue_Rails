<template>
  <div>
    <CreateEditGroup />
    <stats-card class="admin-fields" header-color="">
      <template slot="header" style="padding-top: 10px">
        <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Custom Fields</p>
      </template>
      <template slot="footer">
        <strong class="title" slot="header-title" style="padding: 0; text-align: left; color: black;">
          Custom fields are displayed in groups. Create a new field group, or add fields to one of the groups below. You can drag and drop fields to change their display order or move them between field groups.
        </strong>
        <div class="d-flex justify-content-between align-baseline">
          <strong style="color: red;">
            It is strongly recommended you restart your server after adding or removing any custom field.
          </strong>
          <md-button class="md-simple" @click="showModal">
            <strong style="color: darkblue; font-weight: 700;">Create Field Group</strong>
          </md-button>
        </div>
        <tabs
          :tab-name="Object.keys(adFieldsStates.categories)"
          color-button="warning"
          style="box-shadow: none; margin: 0;"
          class="field-tabs"
          :activeInx="Object.keys(adFieldsStates.categories).indexOf(adFieldsStates.selectCatename) > -1 ? Object.keys(adFieldsStates.categories).indexOf(adFieldsStates.selectCatename) : 0"
          @tabchange="tabChange"
        >
          <template slot="tab-pane-1">
            <div v-for="(g, n) in adFieldsStates.categories[Object.keys(adFieldsStates.categories)[0]]" :key="`gacc-${n}`">
              <Group :group="g"/>
            </div>
          </template>
          <template slot="tab-pane-2">
            <div v-for="(g, n) in adFieldsStates.categories[Object.keys(adFieldsStates.categories)[1]]" :key="`gcom-${n}`">
              <Group :group="g"/>
            </div>
          </template>
          <template slot="tab-pane-3">
            <div v-for="(g, n) in adFieldsStates.categories[Object.keys(adFieldsStates.categories)[2]]" :key="`gcon-${n}`">
              <Group :group="g"/>
            </div>
          </template>
          <template slot="tab-pane-4">
            <div v-for="(g, n) in adFieldsStates.categories[Object.keys(adFieldsStates.categories)[3]]" :key="`glead-${n}`">
              <Group :group="g"/>
            </div>
          </template>
          <template slot="tab-pane-5">
            <div v-for="(g, n) in adFieldsStates.categories[Object.keys(adFieldsStates.categories)[4]]" :key="`gopp-${n}`">
              <Group :group="g"/>
            </div>
          </template>
        </tabs>
      </template>
    </stats-card>
  </div>
</template>

<script>
import store from "@/store";
import { mapState, mapGetters} from "vuex"
import { act_admin } from "@/store/types/actions.type";
import { StatsCard } from "@/components";
import { Tabs } from "@/components";
import CreateEditGroup from './createEditGroup.vue'
import Group from './group.vue'

export default {
  name: 'admin-fields',
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(act_admin.viewsearch, false),
      store.dispatch(act_admin.fields.group.search, 'Account'),
      store.dispatch(act_admin.tags.get)
    ]).then(() => {
      console.log(store.getters.adFieldsStates)
      next();
    });
  },
  computed: mapState({
    ...mapGetters(["adFieldsStates", "adTagsStates"]),
    ceGroupID: state => state.adminFields.ceGroupID,
  }),
  components: {
    StatsCard,
    Tabs,
    CreateEditGroup,
    Group,
  },
  data() {
    return {
    };
  },
  methods: {
    tabChange(active) {
      Promise.all([
        store.dispatch(act_admin.fields.selectCatename, active),
        store.dispatch(act_admin.fields.group.search, active),
        store.dispatch(act_admin.tags.get)
      ]).then(res => {

      })
    },
    showModal() {
      Promise.all([
        store.dispatch(act_admin.fields.setCEGroupID, null),
        store.dispatch(act_admin.tags.get)
      ]).then(() => {
        this.$bvModal.show('ceGroupModal');
      });
    },
  }
};
</script>
<style lang="scss">
.admin-fields {
  .md-card-header {
    padding: 0;
  }
  .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
    padding: 0;
  }
  .md-card-tabs .md-list .md-list-item .md-list-item-button {
      line-height: 20px;
  }
  .md-card-stats .md-card-content {
    text-align: left;
  }
  .field-tabs {
    .tab-content {
      display: inline;
    }
  }
}
</style>
