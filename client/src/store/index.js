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
		user: "",
		roomList: [],
		currentRoom: ""
	},
	getters: {
		getUser(state) {
			return state.user;
		},
		getRoom(state) {
			return state.currentRoom;
		}
	},
	mutations: {
		updateUser(state, payload){
			state.user = payload.user;
		},
		updateCurrentRoom(state, payload){
			state.currentRoom = payload;
		}
	},
	actions: {
		async signup(state, payload){
			try {
				const result = await firebaseApi.signup(payload.email, payload.password, payload.nickname);
				console.log(result);
				await firebaseApi.addUser(result.user);
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
				await firebaseApi.addUser(result.user);
				state.commit('updateUser', result);

				return result;
			} catch (error) {
				throw error;
			}
		},
		logout(){
		},
		async makeChatRoom(state, payload){
			try {
				const result = await firebaseApi.makeChatRoom(payload.roomName, payload.gpsX, payload.gpsY);
				console.log(result);
				state.commit('updateCurrentRoom', result);
				
				return result;
			} catch (error) {
				throw error;
			}
		},
		async joinRoom(state, payload){
			try {
				const result = await firebaseApi.joinRoom(payload.roomId);
				
			} catch (error) {
				
			}
		}

		
	}
})
