import Vue from 'vue'
import Vuex from 'vuex'

import recipes from './recipes'


Vue.use(Vuex)

export default new Vuex.Store({
    namespaced: true,
    state: {},
    modules: {
        recipes
    }
})