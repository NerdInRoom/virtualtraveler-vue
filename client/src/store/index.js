import Vue from 'vue'
import Vuex from 'vuex'
import {chatStore} from './chatStore'
import {mapStore} from './mapStore'
import {userStore} from './userStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    mapStore,
    chatStore
  },
  state: {
    chat: "chat"
  },
  mutations: {},
  actions: {},
  modules: {}
})
