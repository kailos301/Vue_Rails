<template>
  <div class="strip" style="width: 100px;"
    :style="status ==='rejected' ? 'background:OrangeRed;' : status==='new' ? 'background: Silver;' : status==='converted'? 'background: Turquoise': status === 'contacted'?'background:Lime;':''" >
    <strong v-html="status" />
  </div>
</template>

<script>
export default {
  name: "lead-status",
  props: {
    status: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  beforeMount() {
    alert()
  }
};
</script>
<style lang="scss">
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
</style>