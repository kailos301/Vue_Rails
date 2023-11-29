<template>
  <div class="lead-detail md-layout d-flex justify-content-between align-baseline pt-1 pb-1" @mouseover="btToggle = true" @mouseleave="btToggle = false">
    <div class="d-flex justify-content-between align-baselne">
      <div class="strip" style="width: 100px;"
        :style="lead.status=='rejected' ? 'background:OrangeRed;' : lead.status=='new' ? 'background: Silver;' : lead.status=='converted'? 'background: Turquoise': lead.status == 'contacted'?'background:Lime;':''" >
        <strong v-html="lead.status" />
      </div>
      <div style="padding-left: 10px;">
        <span class="d-flex">
          <a :href="server_url+'entities/lead/'+lead.id" v-html="fullUserName" />
          <small v-html="lead.company" style="padding-left: 3px;" />
        </span>
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-primary" @click="loadForm">Edit</md-button>

      <md-button v-if="lead.status === 'rejected'" disabled class="md-default" >Convert</md-button>
      <md-button v-else-if = "lead.status =='converted'" class="md-default" disabled >Convert</md-button>
      <md-button v-else class="md-warning" @click="changeStatus('convert')">Convert</md-button>

      <md-button v-if="lead.status === 'rejected'" class="md-default" disabled >Reject</md-button>
      <md-button v-else class="md-info" @click="changeStatus('reject')" >Reject</md-button>

      <md-button class="md-danger" @click="delLead">Delete?</md-button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { act_user } from "@/store/types/actions.type";
import { SERVER_URL } from "@/common/config";
import Swal from "sweetalert2";
export default {
  name: "detail-lead",
  props: {
    lead: {
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
    // showModal() {
    //   store.dispatch(act_admin.users.editID, this.$props.user.id)
    // },
    changeStatus(status){
      alert(status);
    },
    loadForm(){
    },
    delLead() {
      // let username = JSON.stringify(this.$props.user.username)
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: `Not be able to recover ${username}!`,
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes, delete it!',
      //   cancelButtonText: 'No, keep it'
      // }).then((result) => {
      //   if (result.value) {
      //     Promise.all([
      //       store.dispatch(act_admin.users.delete, this.$props.user.id),
      //     ]).then(() => {
      //       Promise.all([
      //         store.dispatch(act_admin.users.search),
      //         store.dispatch(act_admin.groups.get),
      //       ]).then(() => {
      //         this.notifyVue({m: `Deleted ${username}!`, c: 'success'})
      //       }).catch(err => {
      //         this.notifyVue({t: 2500, m: `Failed to Delete ${username}...`, c: 'warning', v: 'top', h: 'left'})
      //       })
      //     }).catch(err=> {
      //       this.notifyVue({t: 2500, m: `Failed to Delete ${username}...`, c: 'warning', v: 'top', h: 'left'})
      //     })
      //   }
      // })
    },
  },
  computed: {
    fullUserName() {
      let data = this.$props.lead
      let temp = ''
      if (data.first_name && data.last_name) {
        if (data.first_name) temp += data.first_name
        if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
      } else temp = data.email
      return temp
    }
  }
};
</script>
<style lang="scss">
  .lead-detail:hover {
    background: #efefef;;
  }
  .lead-detail {
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