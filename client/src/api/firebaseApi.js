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
		console.log("Log ON");
	} else {
		console.log("Log Off");
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

	/* FireStore */
	async createChatRoom(chatRoom) {
		try {
			const docRef = await firestore.collection('chatRoomList').add(chatRoom);
			chatRoom.id = docRef.id;
			return chatRoom;
		} catch (error) {
			throw error;
		}
	},
	async joinRoom(roomId) {
		const user = store.getters.getLoginUser;
		await firestore.collection('chatRoomList').doc(roomId).collection('guest').add(user);
		const doc = await firestore.collection('chatRoomList').doc(roomId).get();
		let data = doc.data();
		data.roomId = roomId;
		return data;
	
	},
	fetchRoomList() {
		return new Promise((resolve, reject) => {
			const querySnapshot = firestore.collection('chatRoomList').onSnapshot((querySnapshot)=>{
				let roomList = new HashMap();
				querySnapshot.forEach(function (doc) {
					let data = doc.data();
					data.roomId = doc.id;
					roomList.put(roomId, data);
				});
				store.commit('updateRoomList', roomList);
				resolve(roomList);
			}, reject);
		});
	},
	sendMessage(roomId, message){
        firestore.collection('room').doc(roomId).collection('chatMessages').add(message);
	},
	fetchMessage(roomId){
		return new Promise((resolve, reject) => {
			firestore.collection('room').doc(roomId).collection('chatMessages').orderBy('createdAt').onSnapshot((querySnapshot) => {
				let allMessages = [];
				querySnapshot.forEach(doc => {
					let data = doc.data();
					data.id = doc.id;
					allMessages.push(data);
				}),
				store.commit('setMessages', allMessages);
				resolve(allMessages);
			}, reject);
		});
	},
	/* FireStore */
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
			console.log("nickname setting complete")
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
	}
}
