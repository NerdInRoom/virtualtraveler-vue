import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import storage from '../utils/storage.js';
import randomName from '../utils/randomName.js';

// Firebase config
/* const config = {
	apiKey: "AIzaSyDTUkBmOKTMBSyanz8aE9lVpTZ7N_arbT4",
	authDomain: "vue-fb-chat-test.firebaseapp.com",
	databaseURL: "https://vue-fb-chat-test.firebaseio.com",
	projectId: "vue-fb-chat-test",
	storageBucket: "vue-fb-chat-test.appspot.com",
	messagingSenderId: "294332183075",
	appId: "1:294332183075:web:b897ddecb6df108a2ef796"
};*/
const config = {
    apiKey: "AIzaSyDdghMoTmWMMsno4LHzFyeAR6p8oKWjwRE",
    authDomain: "seungmi-chatting-test.firebaseapp.com",
    databaseURL: "https://seungmi-chatting-test.firebaseio.com",
    projectId: "seungmi-chatting-test",
    storageBucket: "gs://seungmi-chatting-test.appspot.com/",
    messagingSenderId: "746818600428"
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
	getCurrentUser() {
		firebase
			.auth()
			.onAuthStateChanged((user) => {
			return user;
		  });
	},

	/* FireStore */
	// 회원가입 및 구글로그인 시 실행
	addUser(user) {
		let docRef = firestore.collection('user').doc(user.email);
		docRef.get().then((doc) => {
			if (!doc.exists) {
				docRef.set({ displayName: user.displayName });
			}
		});
	},
	async makeChatRoom(roomName, gpsX, gpsY) {
		const user = store.getters.getUser;
		let newData = {
			roomName: roomName,
			roomGpsX: gpsX,
			roomGpsY: gpsY,
			roomHost: user.email
		};
		try {
			const docRef = await firestore.collection('chatRoomList').add(newData);
			await firestore.collection('user').doc(user.email).update({ userHostRoom: docRef.id });
			newData.roomId = docRef.id;
			return newData;
		} catch (error) {
			throw error;
		}

	},
	getUserGuestRoom() {
		const user = store.getters.getUser;
		firestore.collection('user').doc(user.email).get().then((documentSnapshot) => {
			let data = documentSnapshot.data();
			return data.userGuestRoom;
		});
	},
	async joinRoom(roomId) {
		const user = store.getters.getUser;
		await firestore.collection('user').doc(user.email).update({ userGuestRoom: roomId });
		await firestore.collection('chatRoomList').doc(roomId).collection('roomJoinUser').doc(user.email).set({ userName: user.displayName });
		const doc = await firestore.collection('chatRoomList').doc(roomId).get();
		let data = doc.data();
		data.roomId = roomId;
		return data;
	
	},
	fetchGPS() {
		return new Promise((resolve, reject) => {
			const currentRoom = store.getters.getRoom;
			console.log(currentRoom.roomId);
			firestore.collection('chatRoomList').doc(currentRoom.roomId).onSnapshot((documentSnapshot) => {
				let data = documentSnapshot.data();
				data.roomId = currentRoom.roomId;
				store.commit('updateCurrentRoom', data);
				resolve(data);
			}, reject);
		});
	},
	fetchRoomList() {
		return new Promise((resolve, reject) => {
			const querySnapshot = firestore.collection('chatRoomList').onSnapshot((querySnapshot)=>{
				let roomList = [];
				querySnapshot.forEach(function (doc) {
					let data = doc.data();
					data.roomId = doc.id;
					roomList.push(data);
				});
				store.commit('updateRoomList', roomList);
				resolve(roomList);
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
