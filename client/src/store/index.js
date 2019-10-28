import Vue from 'vue'
import Vuex from 'vuex'
import {chatStore} from './chatStore'
import {mapStore} from './mapStore'
import {userStore} from './userStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    chatStore,
    mapStore,
    userStore
  },
  state: {
  },
  mutations: {
    setRoomLocation (state, changedInfo) {
      state.roomList.forEach((room, index) => {
        if (room.roomId === changedInfo.roomId) {
          state.roomList[index].roomGPS.latitude = changedInfo.latitude
          state.roomList[index].roomGPS.longitude = changedInfo.longitude
        }
      })
    }
  },
  actions: {
    async getRoomInfo ({ state }, id) {
      return state.roomList.find(room => room.roomId === id)
    }
  },
  mutations: {},
  actions: {},
})
