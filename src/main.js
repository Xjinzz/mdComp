import 'babel-polyfill';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/index.js';


// import LeComponents from "@CoreUILib/le-components.min.js";

Vue.use(Vuex);

router.afterEach(function(to, from, next){
  
});

export default new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
