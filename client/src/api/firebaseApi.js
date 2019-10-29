import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import store from '../store/index.js'
// import randomName from '@util/randomName.js';

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

export default {

	/* Firebase Auth */
	async signup(email, password, nickname) {
		try {
			const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
			await result.user.updateProfile({
				displayName: nickname
			});
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
			return result;
		} catch (error) {
			throw error;
		}
	},
	logout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				return true;
        	}).catch((err) => {
				console.log("[" + err.code + "] " + err.message);
				return false;
        });
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
		const user = store.getters.getUser();
		firestore.collection('user').doc(user.email).get().then((documentSnapshot) => {
			let data = documentSnapshot.data();
			return data.userGuestRoom;
		});
	},
	async joinRoom(roomId) {
		const user = store.getters.getUser();
		await firestore.collection('user').doc(user.email).update({ userGuestRoom: roomId });
		await firestore.collection('chatRoomList').doc(roomId).collection('roomJoinUser').doc(user.email).set({ userName: user.displayName });
		await firestore.collection('chatRoomList').doc(roomId).get().then((doc)=>{
			let data = doc.data();
			return data;
		});
	},
	fetchGPS() {
		const currentRoom = store.getters.getRoom();
		firestore.collection('chatRoomList').doc(currentRoom.id).onSnapshot((documentSnapshot) => {
			let data = documentSnapshot.data();
			return data;
		});
	},
	fetchRoomList() {
		firestore.collection('chatRoomList').onSnapshot((querySnapshot) => {
			var roomList = [];
			querySnapshot.forEach(function (doc) {
				roomList.push(doc.data());
			});
			return roomList;
		});
	}
}
