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
		roomList : [
            {
              roomId: 1,
              roomGPS: {
                latitude: 37.501659145454916,
                longitude: 127.03949742339348
              },
              roomOwnerId: 123,
            },
            {
              roomId: 2,
              roomGPS: {
                latitude: 37.50110077097606,
                longitude: 127.03874507229055
              },
              roomOwnerId: 456,
            }
        ]
	},
	getters: {
		getUser(state) {
			return state.user;
		},
		getRoomList(state){
			return state.roomList;
		}
	},
	mutations: {
		updateUser(state, payload){
			state.user = payload.user;
		},
		addRoom(){

		}
	},
	actions: {
		addRoom(){
			//파베에다 넣기
		},
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
