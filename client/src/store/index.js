import Vue from 'vue';
import Vuex from 'vuex';

// Store에서는 '@'로 src 접근이 불가하다.
import firebaseApi from '../api/firebaseApi';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		accessToken: "",
		refreshToken: "",
		user: "",
		roomList: [
			{
			  roomId: 1,
			  roomGPS: {
				latitude: 37.501307,
				longitude: 127.03966
			  },
			  roomOwnerId: 123
			},
			{
			  roomId: 2,
			  roomGPS: {
				latitude: 35.92807,
				longitude: 126.961661
			  },
			  roomOwnerId: 456
			}
		  ]
	},
	getters: {
		getUser(state) {
			return state.user;
		},
		getRoomInfo: (state) => (id) => {
			return state.roomList.find(room => room.roomId === id);
		},
		getRoomList(state) {
			return state.roomList;
		}
	},
	mutations: {
		updateUser(state, payload){
			state.user = payload.user;
		},
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
