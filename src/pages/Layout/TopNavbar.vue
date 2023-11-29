<template>
  <md-toolbar
    md-elevation="4"
    class="md-dense md-fixed-top mb-2 nav-top"
    style="hright: 20px;"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <div v-for="(item, n) in navItems[settingState.nav]" :key="'item-'+n">
            <md-list-item :href="item.href">
              <i :class="item.icon.class">{{item.icon.name}}</i>
              <p :class="item.title.class">{{item.title.name}}</p>
            </md-list-item>
          </div>
          <drop-down direction="down">
            <md-button
              slot="title"
              class="md-button md-simple"
              data-toggle="dropdown"
            >
              <div class="photo" style="padding: 0;">
                <img :src="avatar" alt="avatar" style="width: 40px;" />
              </div>
            </md-button>
            <ul class="dropdown-menu dropdown-menu-right" style="background: #989898;">
              <md-list-item href="#" style="margin-right: 0;">
                <md-icon>list</md-icon>
                <a href="#" @click="toggleNav" class="md-black" style="font-size: 12px; font-weight: 600;">
                  <p>{{settingState.nav === 'user' ? 'Admin' : 'User'}}</p>
                </a>
              </md-list-item>
              <md-list-item href="#" style="margin-right: 0;">
                <md-icon>description</md-icon>
                <a href="#" class="md-black" style="font-size: 12px; font-weight: 600;"><p>Profile</p></a>
              </md-list-item>
              <md-list-item href="#" style="margin-right: 0;">
                <md-icon>logout</md-icon>
                <a href="#" class="md-black" style="font-size: 12px; font-weight: 600;"><p>logout</p></a>
              </md-list-item>
            </ul>
          </drop-down>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import store from '@/store';
import {mapState, mapGetters} from "vuex";
import {act_setting} from "@/store/types/actions.type";
import { items } from "./TopBarItems";

export default {
  props: {
    avatar: {
      type: String,
      default: "./img/faces/avatar.jpg"
    },
    account: {
      type: Object,
      default: () => {
        return {admin: 1}
      },
    },
  },
  computed: {
    ...mapGetters(["settingState"]),
  },
  data() {
    return {
      navItems: items,
    };
  },
  methods: {
    toggleNav(ev) {
      ev.preventDefault()
      Promise.all([
        store.dispatch(act_setting.nav)
      ]).then(() => {
        store.getters.settingState.nav === 'user' 
          ? this.$router.replace('/user')
          : this.$router.replace('/admin')
       
      })
      
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  }
};
</script>
<style lang='scss'>
  .md-button:not(.md-just-icon):not(.md-btn-fab):not(.md-icon-button):not(.md-toolbar-toggle) .md-ripple {
    padding: 0px 20px;
  }
  .md-toolbar.md-dense {
    min-height: 40px;
    max-height: 40px;
  }
  .nav-top {
    .dropdown-menu li > a {
      padding: 0 20px 0 0;
      width: fit-content;
      height:  30px;
      p {
        color:  white;
      }
    }
    .md-list-item-content>.md-icon:first-child {
      color:  white;
      margin-right: 2px;
    }
  }
</style>
