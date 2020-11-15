import Vue from 'vue'
import Vuex from 'vuex'

import recipes from './recipes'
import firebase from './firebase'


Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {},
    modules: {
        firebase,
        recipes
    }
})