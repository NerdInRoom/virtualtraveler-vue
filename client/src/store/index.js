import Vue from 'vue';
import Vuex from 'vuex';

// Store에서는 '@'로 src 접근이 불가하다.
import firebaseApi from '../api/firebaseApi';
import kakaomapApi from '../api/kakaomapApi';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: "",
		refreshToken: "",
		user: ""
	},
	getters: {
		getUser(state) {
			return state.user;
		}
	},
	mutations: {
		updateUser(state, payload){
			state.user = payload.user;
		}
	},
	actions: {
		async signup(state, payload){
			try {
				const result = await firebaseApi.signup(payload.email, payload.password, payload.nickname);
				state.commit('updateUser', result);

				return result;
			} catch (error) {
				throw error;
			}
		},
		async loginWithEmail(state, payload){
			try {
				const result = await firebaseApi.loginWithEmail(payload.email, payload.password);
				state.commit('updateUser', result);

				return result;
			} catch (error) {
				throw error;
			}
		},
		async loginWithGoogle(state){
			try {
				const result = await firebaseApi.loginWithGoogle();
				state.commit('updateUser', result);

				return result;
			} catch (error) {
				throw error;
			}
		},
		logout(){
		}
	}
})
