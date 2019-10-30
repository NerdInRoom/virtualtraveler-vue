import Vue from 'vue';
import Vuex from 'vuex';

// Store에서는 '@'로 src 접근이 불가하다.
import firebaseApi from '../api/firebaseApi';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginState: false,
		loginUser: "",
		roomList: [
			{
				roomId: 1,
				roomGPS: {
					latitude: 37.501307,
					longitude: 127.03966
				},
				roomOwnerId: "test@test.com"
			}
		],
		roomInfoForChatDetail : "",
		dialog:false
	},
	getters: {
		getLoginState(state) {
			return state.loginState;
		},
		getLoginUser(state) {
			return state.loginUser;
		},
		getRoomInfo: (state) => (id) => {
			return state.roomList.find(room => room.roomId === id);
		},
		getRoomList(state) {
			return state.roomList;
		},
		getRoomInfoForChatDetail(state){
			return state.roomInfoForChatDetail;
		},
		getDialog(state){
			return state.dialog;
		},
	},
	mutations: {
		updateLoginState(state, payload){
			state.loginState = payload;	
		},
		updateLoginUser(state, payload){
			const user = {
				uid: '',
				email: '',
				nickname: ''
			}

			if(payload){
				user.uid = payload.uid;
				user.email = payload.email;
				user.nickname = payload.displayName;

				state.loginUser = user;
				state.loginState = true;
			} else {
				state.loginUser = null;
				state.loginState = false;
			}
		},
		setRoomLocation (state, changedInfo) {
			state.roomList.forEach((room, index) => {
				if (room.roomId === changedInfo.roomId) {
					state.roomList[index].roomGPS.latitude = changedInfo.latitude
					state.roomList[index].roomGPS.longitude = changedInfo.longitude
				}
			})
		},
		addRoom(state, roomInfo) {
			state.roomList.push(roomInfo);
		},
		setRoomInfoForChatDetail(state, roomInfo){
			state.roomInfoForChatDetail = roomInfo;
		},
		setDialog(state){
			state.dialog = !state.dialog;
		}
	},
	actions: {
		addRoom(){
			//파베에다 넣기
		},
		async signup(state, payload){
			try {
				const result = await firebaseApi.signup(payload.email, payload.password, payload.nickname);
				state.commit('updateLoginUser', result.user);

				return result;
			} catch (error) {
				throw error;
			}
		},
		async loginWithEmail(state, payload){
			try {
				const result = await firebaseApi.loginWithEmail(payload.email, payload.password);
				state.commit('updateLoginUser', result.user);

				return result;
			} catch (error) {
				throw error;
			}
		},
		async loginWithGoogle(state){
			try {
				const result = await firebaseApi.loginWithGoogle();
				state.commit('updateLoginUser', result.user);

				return result;
			} catch (error) {
				throw error;
			}
		},
		async logout(state){
			try {
				const result = await firebaseApi.logout();
			} catch (error) {
				throw error;
			}
		},
		setAuthListener(state){
			try {
					firebase.auth().onAuthStateChanged(function(user) {
						if (user) {
							if(user.uid != state.getters.getLoginUser.uid){
								state.dispatch('logout');
							}
						} else {
							state.commit('updateLoginUser', null);
						}
				});
			} catch (error) {
				console.log("[" + error.code + "] " + error.message);
			}
		}
	}
})
