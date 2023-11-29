<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-20 md-xsmall-size-100 md-size-100 lead">
      <stats-card header-color="">
        <template slot="header" style="padding-top: 10px">
          <p class="category" style="float: left; color: blue; font-weight: 700; padding-top: 10px;">Leads</p>
          <p class="category create-lead" style="float: right; color: blue; font-weight: 700; padding-top: 5px;" @click="createTask" >Create Lead</p>
        </template>
        
        <template slot="footer">
          <div v-for="(lead,n) in urLeadsStates.leads" :key="'tag'+n" class="lead-info">
            <DetailLead :lead="lead"/>
            <md-divider class="md-hr md-theme-demo-light" />
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-80 md-xsmall-size-100 md-size-80">
      <!-- <LeadBar /> -->
      <AgGridVue
        ref="lead_index"
        class="ag-theme-alpine w-100 my-4 h-100"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="rowData"
        :modules="modules"
        :animateRows="true"
        :pagination="true"
        :paginationPageSize="10"
        :suppressPaginationPanel="true"
        @grid-ready="onGridReady"
      />
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import store from "@/store";
import { act_user } from "@/store/types/actions.type";
import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import LeadStatus from './main/leadStatus.vue'

// import EditUser from "./edit.vue";
import { StatsCard } from "@/components";
// import LeadBar from "./sidebar";
import DetailLead from "./detail.vue";

const CubeComponent = Vue.extend({
  template: '<span>asasas</span>',
  methods: {
  }
})

export default {
  name: 'lead',
  computed: {
    ...mapGetters(["urLeadsStates"])
  },
  components: {
    AgGridVue,
    StatsCard,
    DetailLead,
    // LeadBar
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(act_user.leads.search),
    ]).then(() => {
      next();
    });
  },
  beforeMount() {
    this.gridOptions = {
      autoGroupColumnDef: {
        minWidth: 50,
        maxWidth: 100,
      },
    };
    // cellRendererFramework: 'lead-status',
    this.defaultColDef = {
      flex: 1,
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
   
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.columnApi = this.gridOptions.columnApi;
    this.rowData = store.getters.urLeadsStates.leads
  },
  data: () => {
    return {
      modules: AllCommunityModules,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs:  [
        {field: 'cus', pinned: 'left',
          cellRendererFramework: CubeComponent
        },
        {field: 'fullUserName', 
          valueGetter: ev => {
            let data = ev.data
            let temp = ''
            if (data.first_name && data.last_name) {
              if (data.first_name) temp += data.first_name
              if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
            } else temp = data.email
            return temp
          },},
        {field: 'company',},
      ],
      defaultColDef: null,
      rowData: null,
    };
  },
  methods: {
    onGridReady(params) {
      const updateData = (data) => {
        this.rowData = data;
      };
    },
    fullUserName(data) {
      let temp = ''
      if (data.first_name && data.last_name) {
        if (data.first_name) temp += data.first_name
        if (data.last_name) temp.length ? temp += ` ${data.last_name}` : temp = data.last_name
      } else temp = data.email
      return temp
    },
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
  },
};
</script>
<style lang="scss">
  .lead {
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