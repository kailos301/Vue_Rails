<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>{{ name }}<b class="caret"></b></span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li>
                <a href="#vue"><span class="sidebar-normal">Profile</span></a>
              </li>
              <li>
                <a href="#vue"><span class="sidebar-normal">Settings</span></a>
              </li>
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  components: {
    CollapseTransition
  },
  props: {
    name: {
      type: String,
      default: "Tania Andrew"
    },
    avatar: {
      type: String,
      default: "./img/faces/avatar.jpg"
    }
  },
  data() {
    return {
      isClosed: true
    };
  },
  methods: {
    clicked: function(e) {
      e.preventDefault();
    },
    toggleMenu: function() {
      this.isClosed = !this.isClosed;
    }
  }
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
