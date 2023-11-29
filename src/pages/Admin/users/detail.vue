<template>
  <div class="user-detail md-layout d-flex justify-content-between align-baseline pt-1 pb-1"
    @mouseover="btToggle = true" @mouseleave="btToggle = false"
  >
    <div class="d-flex justify-content-between align-baselne">
      <div class="strip" style="width: auto;"
        :style="user.suspended_at ? '' : user.admin ? 'background: #90ee90;' : 'background: #add8e6;'"
      >
        <strong v-html="user.suspended_at ? 'Suspended' : user.admin ? 'Admin' : 'Active'" />
      </div>
      <div style="padding-left: 10px;">
        <span class="d-flex">
          <a :href="server_url+'/users/'+user.id" v-html="fullUserName" />
          <small v-html="titleCompany" style="padding-left: 3px;" />
          <small v-html="logins" style="padding-left: 3px;" />
          <small v-html="lastLogged" style="padding-left: 3px;" :style="stLastLogged" />
        </span>
        <span class="d-flex">
          <a :href="'mailto: '+user.email">{{user.email}}</a>
          <small v-html="user.phone ? '| phone: ': ''" style="padding-left: 3px;" />
          <small v-html="user.phone" style="color: black; padding-left: 3px;"/>
          <small v-html="user.mobile ? '| mobile: ' : ''" style="padding-left: 3px;" />
          <small v-html="user.mobile" style="color: black; padding-left: 3px;" />
          <small 
            v-html="dateString"
            style="color: black; padding-left: 3px;" 
            :style="user.suspended_at ? 'color: red;' : ''"
          />
        </span>
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-info" @click="showModal">Edit</md-button>
      <md-button class="md-warning" @click="suspendUser" 
        v-html="user.suspended_at ? 'Reactive' : 'Suspended'" />
      <md-button class="md-danger" @click="deleteUser">Delete?</md-button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { act_admin } from "@/store/types/actions.type";
import { SERVER_URL } from "@/common/config";
import Swal from "sweetalert2";
export default {
  name: "detail-user",
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      server_url: SERVER_URL,
      btToggle: false,
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
    showModal() {
      store.dispatch(act_admin.users.editID, this.$props.user.id)
    },
    deleteUser() {
      let username = JSON.stringify(this.$props.user.username)
      Swal.fire({
        title: 'Are you sure?',
        text: `Not be able to recover ${username}!`,
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Promise.all([
            store.dispatch(act_admin.users.delete, this.$props.user.id),
          ]).then(() => {
            Promise.all([
              store.dispatch(act_admin.users.search),
              store.dispatch(act_admin.groups.get),
            ]).then(() => {
              this.notifyVue({m: `Deleted ${username}!`, c: 'success'})
            }).catch(err => {
              this.notifyVue({t: 2500, m: `Failed to Delete ${username}...`, c: 'warning', v: 'top', h: 'left'})
            })
          }).catch(err=> {
            this.notifyVue({t: 2500, m: `Failed to Delete ${username}...`, c: 'warning', v: 'top', h: 'left'})
          })
        }
      })
    },
    suspendUser() {
      let suspend = JSON.parse(JSON.stringify(this.$props.user.suspended_at))
      let username = JSON.stringify(this.$props.user.username)
      Promise.all([
        store.dispatch(act_admin.users.sustoggle, {id: this.$props.user.id, suspend_at:this.$props.user.suspended_at}),
      ]).then(() => {
        Promise.all([
          store.dispatch(act_admin.users.search),
          store.dispatch(act_admin.groups.get),
        ]).then(() => {
          this.notifyVue({m: `${username} is ${suspend ? 'Reactive' : 'Suspended'}!`, c: 'success'})
        }).catch(err => {
          this.notifyVue({t: 2500, m: `Failed to ${suspend ? 'Reactive' : 'Suspended'} ${username}...`, c: 'warning', v: 'top', h: 'left'})
        })
      }).catch(err=> {
        this.notifyVue({t: 2500, m: `Failed to ${suspend ? 'Reactive' : 'Suspended'} ${username}...`, c: 'warning', v: 'top', h: 'left'})
      })
    }
  },
  computed: {
    fullUserName() {
      let data = this.$props.user
      let temp = ''
      if (data.first_name && data.last_name) {
        if (data.first_name) temp += data.first_name
        if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
      } else temp = data.email
      temp += ` (${data.username})`
      return temp
    },
    titleCompany() {
      let data = this.$props.user
      let temp = ''
      if (data.title) temp += ` - ${data.title}`
      if (data.company) temp.length ? temp += ` at ${data.company}` : temp = ` at ${data.company}`
      return temp
    },
    logins() {
      return '| logins pending'
    },
    lastLogged() {
      return '| lastLogged pending'
    },
    stLastLogged() {
      return 'color: red;'
    },
    dateString() {
      let data = this.$props.user
      let temp = '| '
      let date
      if (data.suspended_at) date = new Date(data.suspended_at).toString().split(new RegExp(' ', 'gi'))
      else {
        temp = '| user since '
        date = new Date(data.created_at).toString().split(new RegExp(' ', 'gi'))
      }
      temp += `${date[1]} ${date[2]} ${date[3]}`
      return temp
    }
  }
};
</script>
<style lang="scss">
  .user-detail:hover {
    background: #efefef;;
  }
  .user-detail {
    .strip {
      height: 20px;
      width: auto;
      background: #dcdcdc;
      color: black;
      float: left;
      font-size: 11px;
      margin: 0px 6px 0px 0px;
      padding: 1px 4px 1px 3px;
      text-align: right;
      width: 75px;
      -moz-border-radius-topleft: 7px;
      -moz-border-radius-bottomleft: 7px;
      -webkit-border-top-left-radius: 7px;
      -webkit-border-bottom-left-radius: 7px;
    }
  }
  // a:hover, a:focus {
  //     color: blue;
  //   }
</style>

