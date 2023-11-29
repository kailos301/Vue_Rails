<template>
  <div>
    <EditUser />
    <stats-card class="admin-users" header-color="">
      <template slot="header" style="padding-top: 10px">
        <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Users</p>
        <p class="category create-user" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" @click="showModal" >Create Users</p>
      </template>
      <template slot="footer">
        <div v-for="(user,n) in adUsersStates.users" :key="'tag'+n" class="user-info">
          <DetailUser :user="user"/>
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
import EditUser from "./edit.vue";
import { StatsCard } from "@/components";
import DetailUser from "./detail.vue";

export default {
  name: 'admin-users',
  components: {
    EditUser,
    StatsCard,
    DetailUser,
  },
  computed: {
    ...mapGetters(["adUsersStates"])
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(act_admin.users.search),
      store.dispatch(act_admin.groups.get),
      store.dispatch(act_admin.viewsearch, true)
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
      store.dispatch(act_admin.users.editID, null)
    },
  }
};
</script>
<style lang="scss">
  .create-user:hover {
    cursor: pointer;
  }
</style>
