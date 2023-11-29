<template>
  <b-carousel
    id="crou"
    v-model="slide"
    :interval="4000"
    controls
    indicators
    img-width="100"
    img-height="100"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <div v-for="(item, n) in imgs" :key="`ci-${n}`">
      <b-carousel-slide :img-src="item.image">
        <div class="d-flex justify-content-center">
          <md-switch :value="!item.active" @change="val => updateValue(n, val)"></md-switch>
        </div>
      </b-carousel-slide>
    </div>
  </b-carousel>
</template>
<script>
  export default {
    name: 'crou',
    props: {
      imgs: {
        type: Array,
        default: ()=> {
          return []
        }
      }
    },
    data() {
      return {
        slide: 0,
      }
    },
    methods: {
      updateValue(inx, val) {
        let o = this.$props.imgs.find(k=> k.active)
        if (o) Object.assign(o, {active: false})
        Object.assign(this.$props.imgs[inx], {active: true})
      }
    }
  }
</script>
<style lang="scss">
.md-theme-default a:not(.md-button) {
  top:300px;
}
</style>