import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import './plugins/bootstrap-vue'
import App from './App.vue'

import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// axios.defaults.withCredentials = true;

window.axios = axios
window.Vue = Vue

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
