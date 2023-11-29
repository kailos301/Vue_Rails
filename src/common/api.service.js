import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { SERVER_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = SERVER_URL;
  },

  setHeader() {
    // Vue.axios.defaults.headers.common[
    //   "Authorization"
    // ] = `Token ${JwtService.getToken()}`;
    Vue.axios.defaults.headers.common[
      "Access-Control-Allow-Origin"
    ] = `*`;
    Vue.axios.defaults.headers.common[
      "Access-Control-Allow-Headers"
    ] = `Origin, X-Requested-With, Content-Type, Accept`;
    Vue.axios.defaults.headers.common[
      "Access-Control-Allow-Methods"
    ] = `POST, GET, PUT, DELETE`;
    
  },

  query(resource, {key, query}) {
    return Vue.axios.get(`${resource}?${key}=${query}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    })
  },
  
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;