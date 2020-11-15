import { BASE_URL } from "../../config"
const ENDPOINT = "/api/recipes"
import B from "bluebird"

export default {
    namespaced: true,
    state: {
        data: {},
        list: [],
        count: 0,
        filter: {},
        page: 1,
    },

    actions: {
        getList({ state, commit, rootState }) {
            return axios.get(`${BASE_URL}${ENDPOINT}`, {
                params: {
                    filter: state.filter,
                    fields: "_id name photos type",
                    page: state.page || 1,
                }
            })
            .then(result => {
                if (result.status == 200 && result.data && result.data.data){
                    commit("list", result.data.data)
                    return result.data.data
                }
            })
        },
        getById({ state, commit, rootState }, _id) {
            return axios.get(`${BASE_URL}${ENDPOINT}`, {
                params: {
                    filter: { _id },
                    skip: 0,
                    limit: 1
                }
            })
            .then(result => {
                if (result.status == 200 && result.data && result.data.data && result.data.data[0]){
                    commit("data", result.data.data[0])
                    return result.data.data[0]
                }
            })
        },
        getCount({ state, commit, rootState }) {
            return axios.get(`${BASE_URL}${ENDPOINT}/count`, {
                params: {
                    filter: state.filter
                }
            })
            .then(result => {
                if (result.status == 200 && result.data && result.data.data){
                    commit("count", result.data.data)
                    return result.data.data
                }
            })
        },
        deleteById({ state, commit, rootState }, _id) {
            if (confirm('Are you sure you want to delete this?'))
                return axios.delete(`${BASE_URL}${ENDPOINT}/${_id}`).then(result => result.status == 200)
            else
                return false
        },
        save({ state, commit, rootState }, payload) {
            return B.try(() => {
                if (payload._id) return axios.put(`${BASE_URL}${ENDPOINT}/${payload._id}`, payload)
                else return axios.post(`${BASE_URL}${ENDPOINT}`, payload)
            })
            .then(result => {
                if (result.status == 200 && result.data && result.data.data) {
                    return result.data.data._id || true
                } else {
                    return false
                }
            })
        },
    },

    mutations: {
        data: (state, data) => (state.data = data || {}),
        list: (state, data) => (state.list = data || []),
        count: (state, data) => (state.count = data || 0),
        filter: (state, data) => (state.filter = data || {}),
        skip: (state, data) => (state.skip = data || 0),
    },

    getters: {
        list: (state) => state.list,
        count: (state) => state.count,
        data: (state) => state.data,
        filter: (state) => state.filter,
    }
}