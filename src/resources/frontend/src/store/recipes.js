import { BASE_URL } from "../../config"
const ENDPOINT = "/api/recipes"

export default {
    namespaced: true,
    state: {
        data: {},
        list: [],
        count: 0,
        filter: {},
        skip: 0,
        limit: 10
    },

    actions: {
        getList({ state, commit, rootState }) {
            axios.get(`${BASE_URL}${ENDPOINT}`, {
                params: {
                    filter: state.filter,
                    fields: "_id name photos type",
                    skip: state.skip || 0,
                    limit: state.limit || 10
                }
            })
            .then(result => {
                if (result.status == 200 && result.data && result.data.data) commit("list", result.data.data)
            })
        },
        getById({ state, commit, rootState }, _id) {
            axios.get(`${BASE_URL}${ENDPOINT}`, {
                params: {
                    filter: { _id },
                    skip: 0,
                    limit: 1
                }
            })
            .then(result => {
                if (result.status == 200 && result.data && result.data.data && result.data.data[0]) commit("data", result.data.data[0])
            })
        },
        getCount({ state, commit, rootState }, _id) {
            axios.get(`${BASE_URL}${ENDPOINT}/count`)
            .then(result => {
                if (result.status == 200 && result.data && result.data.data) commit("count", result.data.data)
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