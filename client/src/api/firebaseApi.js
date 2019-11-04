import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import storage from '../utils/storage.js';
import randomName from '../utils/randomName.js';
import { HashMap } from '../utils/hashMap.js';

// Firebase config
const config = {
	apiKey: "AIzaSyDTUkBmOKTMBSyanz8aE9lVpTZ7N_arbT4",
	authDomain: "vue-fb-chat-test.firebaseapp.com",
	databaseURL: "https://vue-fb-chat-test.firebaseio.com",
	projectId: "vue-fb-chat-test",
	storageBucket: "vue-fb-chat-test.appspot.com",
	messagingSenderId: "294332183075",
	appId: "1:294332183075:web:b897ddecb6df108a2ef796"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		//console.log("Log ON");
	} else {
		//console.log("Log Off");
		storage.logout();
		storage.clear();
	}
});

export default {
	/* Firebase Auth */
	async signup(email, password, nickname) {
		try {
			const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
			await result.user.updateProfile({
				displayName: nickname
			});
			await this.addNicknameInPool(nickname);
			return result;
		} catch (error) {
			throw error;
		}		
	},
	async loginWithEmail(email, password) {
		try {
			const result = await firebase.auth().signInWithEmailAndPassword(email, password);
			return result;
		} catch (error) {
			throw error;
		}
	},
	async loginWithGoogle(){
		let provider = new firebase.auth.GoogleAuthProvider();

		try {
			const result = await firebase.auth().signInWithPopup(provider);
			const confirm = await this.userNameConfirm(result.user.email);
			if(confirm == true){
				await result.user.updateProfile({
					displayName: await this.googleRandomizeName()
				});
			}
			return result;
		} catch (error) {
			throw error;
		}
	},
	async logout() {
		try {
			await firebase.auth().signOut();
		} catch (error) {
			throw error;
		}
	},

	/* Chat Room */
	async createChatRoom(chatRoom) {
		try {
			const docRef = await firestore.collection('chatRooms').add(chatRoom);
			await firestore.collection('chatRooms').doc(docRef.id).update({id: docRef.id});
			return docRef.id;
		} catch (error) {
			throw error;
		}
	},
	async setRoomLocation(roomId, changedInfo){
		await firestore.collection('chatRooms').doc(roomId).update({
			location: {
				latitude: changedInfo.latitude,
				longitude: changedInfo.longitude
			}
		});
	},
	async setViewPoint(roomId, changedViewPoint){
		await firestore.collection('chatRooms').doc(roomId).update({
			viewPoint: changedViewPoint
		});
	},
	async joinChatRoom(chatRoom, user) {
		await firestore.collection('chatRooms').doc(chatRoom.id).set(
			{ guest: [
						user
					]
				},
			{ merge: true }			
			);
			await this.sendMessage(chatRoom.id, {
				sender: "system",
				content: user.nickname + "님이 입장했어요!",
				createdAt: ""
			});
		},
	// 현재는 컬렉션으로 되어있어서 지우기 힘듬, array로 바꾼후 시도할 예정
	// deleteChat(chatRoom) {
	// 	firestore.collection('room').doc(chatRoom.id)
	// 			 .collection('chatLog').doc(chatRoom.id).delete().then(function() {
	// 		console.log("Document successfully deleted!");
	// 	}).catch(function(error) {
	// 		console.error("Error removing document: ", error);
	// 	});
	// },
	async outChatRoom(chatRoom, user){
		await firestore.collection('chatRooms').doc(chatRoom.id).update({
			guest: firebase.firestore.FieldValue.arrayRemove({
				...user
			})
		});

		await this.sendMessage(chatRoom.id, {
			sender: "system",
			content: user.nickname + "님이 퇴장했어요!",
			createdAt: ""
		});
	},
	breakRoom(chatRoom){
		firestore.collection('chatRooms').doc(chatRoom.id).delete().then(function() {
			console.log("Document successfully deleted!");
		}).catch(function(error) {
			console.error("Error removing document: ", error);
		});
	},
	fetchChatRooms(state) {
		return new Promise((resolve, reject) => {
			const unsubscribe =
				firestore.collection('chatRooms').onSnapshot((chatRoomsData) => {
					chatRoomsData.docChanges().forEach(async function(change) {
						const id = change.doc.id;
						const chatRoom = change.doc.data();
						if (change.type === "added") {
							state.dispatch('addChatRoom', {id, chatRoom});
						}
						if (change.type === "modified") {
							state.dispatch('editChatRoom', {id, chatRoom});
						}
						if (change.type === "removed") {
							state.dispatch('deleteChatRoom', id);
						}
					});
				});
			resolve(unsubscribe);
		});
	},
	fetchChatRoom(state, id) {
		return new Promise((resolve, reject) => {
			const unsubscribe =
				firestore.collection('chatRooms').doc(id).onSnapshot((chatRoomData) => {
					const id = chatRoomData.id;
					const chatRoom = chatRoomData.data();
					state.commit('updateOnlineChatRoom', chatRoom);
					state.commit('editChatRoom', {id, chatRoom});
				});
			resolve(unsubscribe);
		});
	},

	/* Chatting */
	sendMessage(id, message){
		message.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        firestore.collection('room').doc(id).collection('chatLog').add(message);
	},
	fetchChatLog(id, _this){
		firestore.collection('room').doc(id).collection('chatLog').orderBy('createdAt').onSnapshot((querySnapshot) => {
			let chatLog = [];
			querySnapshot.forEach(doc => {
				let data = doc.data();
				data.id = doc.id;
				chatLog.push(data);
			});
			_this.chatLog = chatLog;
		});
	},

	/* User Nickname */
	async emailRandomizeName(){
		while(true){
            const randomNickname = randomName.randomizeName()
			let confirm = await this.nameConfirm(randomNickname)
			if(confirm == true){
				return randomNickname
			}
		}
	},
	async googleRandomizeName(){
        while(true){
            const randomNickname = randomName.randomizeName()
            let confirm = await this.nameConfirm(randomNickname)
            if(confirm == true){
                await this.addNicknameInPool(randomNickname)
                return randomNickname
            }
        }
	},
	async addNicknameInPool(randomNickname){
		await firestore.collection('nicknamePool').doc(randomNickname).set({
			nickname : randomNickname,
			user : firebase.auth().currentUser.email
		})
		.then( () => {
			// console.log("nickname setting complete")
		}).catch( (error) => {
			console.log(error)
		})
	},
	async nameConfirm(randomNickname){
		let confirm = false
		await firestore.collection('nicknamePool').doc(randomNickname).get().then(
            (doc) => {
                if(doc.exists){
                    confirm = false
                } else{
                    confirm = true
				}
				return confirm
            }
		)
		return confirm
	},
	async userNameConfirm(email){
		let confirm = false
		await firestore.collection('nicknamePool').where('user', '==', email).get().then(
			(doc) => {
				if(doc.empty){
					confirm = true
				}else{
					confirm = false
				}
				return confirm
			}
		)
		return confirm
	},
}
