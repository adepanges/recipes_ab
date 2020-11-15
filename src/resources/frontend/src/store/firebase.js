import { BASE_URL } from "../../config"
const ENDPOINT = "/api/firebase"

export default {
    namespaced: true,
    state: {
        storageBaseUrl: "",
        uid: null,
        token: null
    },

    actions: {
        getToken({ state, commit, rootState }) {
            return axios.post(`${BASE_URL}${ENDPOINT}/storage/token`)
            .then(result => {
                if (result.status == 200 && result.data && result.data.data && result.data.data.uid){
                    commit("storageBaseUrl", result.data.data.base_url)
                    commit("token", result.data.data.token)
                    commit("uid", result.data.data.uid)
                    return result.data.data.token
                }
            })
        }
    },

    mutations: {
        storageBaseUrl: (state, data) => (state.storageBaseUrl = data || ""),
        token: (state, data) => (state.token = data || ""),
        uid: (state, data) => (state.uid = data || ""),
    },

    getters: {
        storageBaseUrl: (state) => state.storageBaseUrl,
        token: (state) => state.token,
        uid: (state) => state.uid,
    }
}