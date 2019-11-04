import Vue from 'vue';
import Vuex from 'vuex';

// Store에서는 '@'로 src 접근이 불가하다.
import firebaseApi from '../api/firebaseApi.js';
import storage from '../utils/storage.js';
import { HashMap } from '../utils/hashMap.js';
import kakaomapApi from '../api/kakaomapApi.js';


Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		nicknameByDraw: '',
		loginState: storage.fetchLoginState(),
		loginUser: storage.fetchLoginUser(),

		chatRooms: new HashMap(),
		markers: new HashMap(),
		selectedId: null,
		onlineChatRoom: storage.fetchOnlineChatRoom(),

		chatMessages: null
	},
	getters: {
		// User Auth Getters
		getLoginState(state) {
			return state.loginState;
		},
		getLoginUser(state) {
			return state.loginUser;
		},
		getNicknameByDraw(state){
			return state.nicknameByDraw;
		},

		// Chat Room Getters
		getChatRooms(state) {
			return state.chatRooms;
		},
		getMarkers(state) {
			return state.markers;
		},
		getMarker(state, id){
			// id: marker id (=chatRoom id)
			return state.markers.get(id);
		},

		// TODO: 제거 후 getRoomIdList가 필요한 부분에 직접 구현하기
		getRoomIdList(state) {
			return state.chatRooms.keys();
		},


		getOnlineChatRoom(state) {
			return state.onlineChatRoom;
		},
		getSelectedId(state) {
			return state.selectedId;
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
		// Room Mutations
		addChatRoom(state, payload) {
			// payload: {
			// 	id: chatRoomId,
			//	chatRoom: chatRoom obj
			// }
			const map = state.chatRooms.getAll();
			const addedMap = { ...map, [payload.id]: payload.chatRoom};
			state.chatRooms.map = addedMap;
		},
		editChatRoom(state, payload) {
			// payload: {
			// 	id: chatRoomId,
			//	chatRoom: chatRoom obj
			// }
			state.chatRooms.put(payload.id, payload.chatRoom);
		},
		deleteChatRoom(state, id) {
			state.chatRooms.remove(id);
		},

		// Marker Mutations
		addMarker(state, marker){
			// payload: {
			// 	id: chatRoomid,
			// 	marker: marker object
			// }
			const origin = state.markers.getAll();
			const updated = {...origin, [marker.getTitle()]: marker};
			state.markers.map = updated;
		},
		deleteMarker(state, id){
			// id: marker id (= chatRoom id)
			state.markers.remove(id);
		},
		editMarker(state, marker) {
			// 	marker: marker object
			
			state.markers.put(marker.title, marker);
		},
		updateOnlineChatRoom(state, chatRoom){
			state.onlineChatRoom = chatRoom;
		},
		updateSelectedId(state, id){
			state.selectedId = id;
			state.onlineChatRoom = state.chatRooms.get(id);
		}
	},
	actions: {
		// User Auth Actions
		async ramdomNickname(state){
			try{
				const result = await firebaseApi.emailRandomizeName();
				state.commit('setNicknameByDraw',result);
				
				return result;
			} catch(error) {
				throw error;
			}
		},
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
				storage.logout();
				return;
			} catch (error) {
				throw error;
			}
		},
		async fetchChatRooms(state){
			try {
				const unsubscribe = await firebaseApi.fetchChatRooms(state);
				return unsubscribe;
			} catch (error) {
				
			}
		},
		async fetchChatRoom(state, id){
			try {
				const unsubscribe = await firebaseApi.fetchChatRoom(state, id);
				return unsubscribe;
			} catch (error) {
				
			}
		},
		async addChatRoom(state, payload) {
			// payload: {
			// 	id: chatRoomId,
			// 	chatRoom: chatRoom obj
			// }
			await state.dispatch('addMarker', payload);
			await state.commit('addChatRoom', payload);
		},

		async deleteChatRoom(state, id) {
			await state.commit('deleteChatRoom', id);
			await state.dispatch('deleteMarker', id);
		},

		async editChatRoom(state, payload) {
			// payload: {
			// 	id: chatRoomId,
			// 	chatRoom: chatRoom obj
			// }
			//const marker = state.getters.getMarker(payload.id);
			await state.commit('editChatRoom', payload);
			// await state.dispatch('editMarker', marker);
		},
		
		
		//Marker Actions
		async addMarker(state, payload){
			// payload: {
			// 	id: chatRoomid
			// 	chatRoom: chatRoom object
			// }
			
			try {
				const marker = await kakaomapApi.createMarker(payload.chatRoom.location);
				marker.setTitle(payload.id);
				state.commit('addMarker', marker);
			} catch (error) {

			}
		},
		async deleteMarker(state, id){
			// id: marker id (= chatRoom id)

			try {
				state.commit('deleteMarker', id);
			} catch (error) {

			}
		},
		async editMarker(state, marker){
			// payload: {
			// 	id: 
			// 	chatRoom: chatRoom object
			// }
			
			try {
				state.commit('editMarker', marker);
			} catch (error) {

			}
		},

		async setRoomLocation({getters},changedInfo){
			await firebaseApi.setRoomLocation(getters.getSelectedId, changedInfo);
		},
		async setViewPoint(state, changedViewPoint) {
			await firebaseApi.setViewPoint(state.getters.getSelectedId, changedViewPoint);
		},
		// Chat Room Actions
		async createChatRoom(state, payload) {
			// payload: {
			// 	title:
			// 	location:{
			// 		latitude:
			// 		longitude:
			// 	 },
			//   viewPoint:
			// }
			const chatRoom = {
				id: '',
				title: payload.title,
				location: {
					latitude: payload.location.latitude,
					longitude: payload.location.longitude
				},
				viewPoint: payload.viewPoint,
				host: state.getters.getLoginUser,
				guest: []
			}
			// Upload Firestore
			const id = await firebaseApi.createChatRoom(chatRoom);
			state.commit('updateSelectedId', id);
			state.commit('updateOnlineChatRoom', state.getters.getChatRooms.get(id));
			return;
		}
	}
});
