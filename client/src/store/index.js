import Vue from 'vue';
import Vuex from 'vuex';

// Store에서는 '@'로 src 접근이 불가하다.
import firebaseApi from '../api/firebaseApi.js';
import storage from '../utils/storage.js';
import { HashMap } from '../utils/hashMap.js';


Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginState: storage.fetchLoginState(),
		loginUser: storage.fetchLoginUser(),
		chatRoomList: new HashMap(),
		selectedChatRoom: {
			title: '',
			host:{
				nickname: ''
			}
		},
		nicknameByDraw: ''
	},
	getters: {
		// User Auth Getters
		getLoginState(state) {
			return state.loginState;
		},
		getLoginUser(state) {
			return state.loginUser;
		},

		// Chat Room Getters
		getChatRoomList(state) {
			return state.chatRoomList;
		},
		getSelectedChatRoom(state) {
			return state.selectedChatRoom;
		},
		getNicknameByDraw(state){
			return state.nicknameByDraw;
		}
	},
	mutations: {
		// User Nickname Mutations
		setNicknameByDraw(state, payload){
			state.nicknameByDraw = payload;
		},
		// User Auth Mutations
		updateLoginState(state, payload){
			state.loginState = payload;	
		},
		updateLoginUser(state, payload){
			state.loginUser = payload;
		},

		// Chat Room Mutations
		createChatRoom(state, payload) {
			const email = payload.host.email;
			const chatRoom = payload.chatRoom;
			const map = state.chatRoomList.getAll();
			// ES6 문법
			const addedMap = { ...map, [email]: chatRoom};

			state.chatRoomList.map = addedMap;
		},
		updateCurrentRoom(state, payload){
			state.currentRoom = payload;
		},
		updateRoomList(state, payload){
			state.roomList = payload;
		},
		updateCurrentRoom(state, payload){
			state.currentRoom = payload;
		},
		setRoomLocation (state, changedInfo) {
			state.roomList.forEach((room, index) => {
				if (room.roomId === changedInfo.roomId) {
					state.roomList[index].roomGPS.latitude = changedInfo.latitude
					state.roomList[index].roomGPS.longitude = changedInfo.longitude
				}
			})
		},
		deleteChatRoom(state, payload){

		},
		selectChatRoom(state, payload){
			state.selectedChatRoom = payload;
		}
	},
	actions: {
		// User Auth Actions
		async signup(state, payload){
			try {
				const result = await firebaseApi.signup(payload.email, payload.password);
				const loginUser = {
					uid: result.user.uid,
					email: result.user.email,
					nickname: result.user.displayName
				};
				state.commit('updateLoginUser', loginUser);
				state.commit('updateLoginState', true);
				storage.login(loginUser);
				return;
			} catch (error) {
				throw error;
			}
		},
		async loginWithEmail(state, payload){
			try {
				const result = await firebaseApi.loginWithEmail(payload.email, payload.password);
				const loginUser = {
					uid: result.user.uid,
					email: result.user.email,
					nickname: result.user.displayName
				};
				state.commit('updateLoginUser', loginUser);
				state.commit('updateLoginState', true);
				storage.login(loginUser);
				return;
			} catch (error) {
				throw error;
			}
		},
		async loginWithGoogle(state){
			try {
				const result = await firebaseApi.loginWithGoogle();
				const loginUser = {
					uid: result.user.uid,
					email: result.user.email,
					nickname: result.user.displayName
				};
				state.commit('updateLoginUser', loginUser);
				state.commit('updateLoginState', true);
				storage.login(loginUser);
				return;
			} catch (error) {
				throw error;
			}
		},
		async logout(state){
			try {
				await firebaseApi.logout();
				const loginUser = null;
				state.commit('updateLoginUser', loginUser);
				state.commit('updateLoginState', false);
				return;
			} catch (error) {
				throw error;
			}
		},

		// Chat Room Actions
		async createChatRoom(state, payload) {
			const host = state.getters.getLoginUser;
			const chatRoom = {
				id: 1,
				title: payload.title,
				location: {
					latitude: payload.latitude,
					longitude: payload.longitude,
					marker: payload.marker
				},
				host: {
					uid: host.uid,
					email: host.email,
					nickname: host.nickname
				},
				guest: [
						{
							uid: "afadf",
							nickname: "케로츄",
							email: "eee@ndf.com"
						},
						{
							uid: "afadf",
							nickname: "슈슈밍",
							email: "eee@ndf.com"
						},
						{
							uid: "afadf",
							nickname: "곽빛",
							email: "eee@ndf.com"
						},

				],
				chat: [

				]
			}
			// Upload Firestore

			state.commit('createChatRoom', {
				host,
				chatRoom
			});
			return;
		},
		async ramdomNickname(state){
			try{
				console.log("hit");
				const result = await firebaseApi.emailRandomizeName();
				console.log(result);
				state.commit('setNicknameByDraw',result);
				
				return result;
			} catch(error) {
				throw error;
			}
		}

		
	}
});
