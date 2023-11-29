<template>
  <div>
    <EditTag />
    <stats-card class="admin-tags" header-color="">
      <template slot="header" style="padding-top: 10px">
        <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Tags</p>
        <p class="category create-tag" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" 
          @click="showModal" >Create Tag</p>
      </template>
      <template slot="footer">
        <div v-for="(tag,n) in adTagsStates.tags" :key="'ts-'+n" class="tag-info">
          <DetailTag :tag="tag"/>
          <md-divider class="md-hr md-theme-demo-light" />
        </div>
      </template>
    </stats-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import store from "@/store";
import { act_admin } from "@/store/types/actions.type";
import { StatsCard } from "@/components";
import EditTag from './edit.vue';
import DetailTag from './detail.vue'

export default {
  name: 'admin-tags',
  components: {
    StatsCard,
    EditTag,
    DetailTag
  },
  computed: mapState({
    ...mapGetters(["adTagsStates"]),
    error: state => state.adminTags.error,
  }),
  watch: {
    error(newValue, oldValue) {
      this.notifyVue({m: newValue})
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(act_admin.tags.get),
      store.dispatch(act_admin.viewsearch, false),
    ]).then(() => {
      next();
    });
  },
  mounted() {
    console.log(this.$store.getters.adTagsStates.tags);
  },
  data() {
    return {
    };
  },
  methods: {
    notifyVue({t, m, i, v, h, c}) {
      this.$notify({
        timeout: t || 2500,
        message: m || '',
        icon: i || "add_alert",
        horizontalAlign: h || 'left',
        verticalAlign: v || 'top',
        type: c || 'warning'
      });
    },
    showModal() {
      store.dispatch(act_admin.tags.editID, null)
    }
  }
};
</script>
<style lang="scss">
  .admin-tags {
    .md-card-header {
      padding: 0;
    }
    .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
      padding: 0;
    }
    .tab-content {
      display: inline;
    }
    .create-tag:hover {
      cursor: pointer;
    }
  }
</style>
