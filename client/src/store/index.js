import Vue from 'vue'
import Vuex from 'vuex'
import dbCRUD from '@/api/firebaseAPI.js'

Vue.use(Vuex)

// vuex store에서 dbCRUD의 기능을 사용하여 state변경
// 아직은 미완성 이므로 추후 따로 module화 하여 적용할 예정
export default new Vuex.Store({
  state: {
    loginstate: 'init',
    authUser: null,
    messages: []
  },
  getters: {
  
  },
  // state를 변경할 때
  mutations: {
    changeInitState: function(state, payload){
      return state.loginstate = 'init'
    },
    changeEmailLoginState: function(state, payload){
      return state.loginstate = 'emailLogin'
    },
    changeEmailSignUpState: function(state, payload){
      return state.loginstate = 'emailSignUp'
    },
    setUser(state, user){
      return state.authUser = user
    },
    setMessages(state, allMessages){
      return state.messages = allMessages
    }
  },
  // dbCRUD를 사용할 때
  actions: {
    authConfirm({ commit, state }){
      return dbCRUD.authConfirm()
    },
    emailLogin({ commit, state }, { email, password }){
      return dbCRUD.emailLogin(email, password)
    },
    fetchMessages({ commit, state }){
      return dbCRUD.fetchMessage()
    }
  }
})
