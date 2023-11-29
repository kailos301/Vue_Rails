<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-40 md-xsmall-size-100 md-size-30">
    </div>
    <div class="md-layout-item md-medium-size-60 md-xsmall-size-100 md-size-70 tasks">
      <stats-card header-color="">
        <template slot="header" style="padding-top: 10px">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Tasks</p>
          <p class="category create-task" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" @click="createTask" >Create Task</p>
        </template>
        <template slot="footer">
          <h6 class="title" slot="header-title" style="padding: 0; text-align: left; color: black;">
            You don't have any pending tasks. Feel free to create new task.
          </h6>
          <md-divider class="md-hr"></md-divider>
          <div class="md-group h-75 justify-content-center">
            <md-button class="md-success" @click="download('xls')">.xls</md-button>
            <md-button class="md-info" @click="download('csv')">.csv</md-button>
            <md-button class="md-default" @click="download('rss')">.rss</md-button>
            <md-button class="md-warning" @click="download('atom')">.atom</md-button>
            <md-button class="md-danger" @click="download('perm')">.perm</md-button>
          </div>
        </template>
      </stats-card>
    </div>
  </div>
</template>
<script>
import { StatsCard } from "@/components";

export default {
  name: 'tasks',
  components: {
    StatsCard,
  },
  data() {
    return {
    };
  },
  methods: {
    createTask() {
      alert('view create form...');
    },
    download(ext) {
      switch(ext) {
        case '.xls': {

        }
        case '.csv': {

        }
        case '.rss': {

        }
        case '.atom': {

        }
        case '.perm': {

        }
      }
      alert('download- *'+ext)
    }
  }
};
</script>
<style lang="scss">
  .tasks {
    .md-card-header {
      padding: 0;
    }
    .md-card-tabs .md-list .md-list-item .md-list-item-button .md-list-item-content {
      padding: 0;
    }
    .tab-content {
      display: inline;
    }
    .create-task:hover {
      cursor: pointer;
    }
  }
</style>
