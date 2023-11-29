<template>
  <div>
    <EditGroup />
    <stats-card class="admin-groups" header-color="">
      <template slot="header" style="padding-top: 10px">
        <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Groups</p>
        <p class="category create-group" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" 
          @click="showModal" >Create Group</p>
      </template>
      <template slot="footer">
        <div v-for="(group,n) in adGroupsStates.groups" :key="'tag'+n" class="group-info">
          <DetailGroup :group="group"/>
          <md-divider class="md-hr md-theme-demo-light" />
        </div>
      </template>
    </stats-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { act_admin } from "@/store/types/actions.type";
import { StatsCard } from "@/components";
import EditGroup from './edit.vue';
import DetailGroup from './detail.vue'

export default {
  name: 'admin-groups',
  components: {
    StatsCard,
    EditGroup,
    DetailGroup
  },
  computed: {
    ...mapGetters(["adGroupsStates"])
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(act_admin.users.search),
      store.dispatch(act_admin.groups.get),
      store.dispatch(act_admin.viewsearch, false)
    ]).then(() => {
      next();
    });
  },
  data() {
    return {
    };
  },
  methods: {
    showModal() {
      store.dispatch(act_admin.groups.editID, null)
    }
  }
};
</script>
<style lang="scss">
  .admin-groups {
    .md-card-header {
      padding: 0;
    }
    .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
      padding: 0;
    }
    .tab-content {
      display: inline;
    }
    .create-group:hover {
      cursor: pointer;
    }
  }
</style>
