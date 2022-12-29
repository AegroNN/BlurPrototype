import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueMaps from 'vue2-google-maps'
/* eslint-disable */
Vue.config.productionTip = false
Vue.use(VueGeolocation);
Vue.use(VueMaps, {
  load:{
    key: "AIzaSyDMghhGV9v-uibf8eGbzdxYisGiN-8cPoE",
    libraries:'places',
  },
},)

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
