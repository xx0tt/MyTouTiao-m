import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },
  getters: {},
  mutations: {
    setUser(state, val) {
      state.user = val
      setToken(val)
    }
  },
  actions: {},
  modules: {}
})
