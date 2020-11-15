import Vue from 'vue'
import axios from 'axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import firebase from "firebase"

import store from './store'
import router from './router'

import { FIREBASE_CONFIG } from "../config"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// axios.defaults.withCredentials = true;
firebase.initializeApp(FIREBASE_CONFIG);

window.axios = axios
window.Vue = Vue

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
