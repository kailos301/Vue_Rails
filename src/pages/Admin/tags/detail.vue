<template>
  <div class="detail-tag md-layout d-flex justify-content-between align-baseline pt-1 pb-1" 
    @mouseover="btToggle = true" @mouseleave="btToggle = false"
  >
    <div class="d-flex">
      <div class="strip" style="background: #add8e6; width: auto;">
        <strong style="font-size: 15px;" v-html="tag.name" />
      </div>
    </div>
    <div class="md-group h-75" :style="btToggle ? 'visibility: visible;' : 'visibility: hidden;'">
      <md-button class="md-info" @click="showModal">Edit</md-button>
      <md-button class="md-danger" @click="deleteTag">Delete?</md-button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { act_admin } from "@/store/types/actions.type";
import Swal from "sweetalert2";
export default {
  name: "detail-tag",
  props: {
    tag: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      btToggle: false
    }
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
      store.dispatch(act_admin.tags.editID, this.$props.tag.id)
    },
    deleteTag() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover the tag!',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          Promise.all([
            store.dispatch(act_admin.tags.delete, this.$props.tag.id),
          ]).then(() => {
            Promise.all([
              store.dispatch(act_admin.tags.get),
            ]).then(() => {
              this.notifyVue({m: 'Deleted!', c: 'success'})
            }).catch(err => {
              this.notifyVue({t: 2500, m: 'Failed to Delete.', c: 'warning', v: 'top', h: 'left'})
            })
          }).catch(err=> {
              this.notifyVue({t: 2500, m: 'Failed to Delete.', c: 'warning', v: 'top', h: 'left'})
          })
        }
      })
    },
  },
};
</script>
<style lang="scss">
  .detail-tag:hover {
    background: #efefef;;
  }
  .detail-tag{
    .strip {
      height: 25px;
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
</style>

