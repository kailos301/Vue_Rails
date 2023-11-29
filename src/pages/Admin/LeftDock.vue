<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-30 md-xsmall-size-100 md-size-20 ad-leftdock">
      <stats-card v-if="adGlobalStates.viewsearch" header-color="">
        <template slot="header">
          <p class="category" style="float: left; color: blue; font-weight: 700;">Search users</p>
        </template>
        <template slot="footer">
          <div class="md-autocomplete">
            <md-autocomplete
              class="search"
              v-model="adUsersStates.query"
              :md-options="[]"
              :md-open-on-focus="false"
              @md-changed="searchUsers"
            >
              <label>Search...</label>
            </md-autocomplete>
          </div>
        </template>
      </stats-card>
      <stats-card header-color="">
        <template slot="header">
          <p class="category" style="float: left; color: blue; font-weight: 700;">Global lists</p>
        </template>
        <template slot="footer">
          <p>No saved lists</p>
        </template>
      </stats-card>
      <stats-card header-color="">
        <template slot="header">
          <p class="category" style="float: left; color: blue; font-weight: 700;">My lists</p>
        </template>
        <template slot="footer">
          <p>No saved lists</p>
        </template>
      </stats-card>
      <stats-card header-color="">
        <template slot="header">
          <p class="category" style="float: left; color: blue; font-weight: 700;">Recent Items</p>
        </template>
        <template slot="footer">
          <p>map.((item, i)=> {iterature...})</p>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-70 md-xsmall-size-100 md-size-80 admin-users">
      <router-view />
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import store from "@/store";
  import { act_admin } from "@/store/types/actions.type";
  import { StatsCard } from "@/components";
  export default {
    name: "admin-left-dock",
    components: {
      StatsCard,
    },
    computed: {
      ...mapGetters(["adUsersStates", "adGlobalStates"])
    },
    data() {
      return {
      };
    },
    methods: {
      searchUsers() {
        store.dispatch(act_admin.users.search, this.$store.getters.adUsersStates.query)
      }
    }
  };
</script>
<style lang="scss">
  .main-panel> .content {
    padding: 0;
  }
  .md-card {
    margin-top: 0;
  }
  .md-card-stats .md-card-header + .md-card-actions {
    margin-top: 0;
    display: inline;
  }
  p {
    margin: 0;
  }
  .ad-leftdock {
    .md-card {
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
</style>