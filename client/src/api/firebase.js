import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import randomName from '@util/randomName.js';

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

export default {
	async signup(email, password) {
		await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					let user = firebase.auth().currentUser;

					user.updateProfile({
						//TODO: Make RandomName()
						nickName: "피자빵"
					});

					return true;
				}).catch((err) => {
					console.log("[" + err.code + "] " + err.message);
					return false;
				});
	},
	loginWithEmail(email, password) {
		return new Promise((resolve, reject) => {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((user => {
					resolve(user);
				}).catch((err) => {
					reject(err);
				}));
		});
	},
	loginWithGoogle(){
		let provider = new firebase.auth.GoogleAuthProvider();

		return new Promise((resolve, reject) => {
			firebase
				.auth()
				.signInWithPopup(provider)
				.then((result) => {
					// accessToken - result.credential.accessToken
					// user - result.user
					resolve(result);
				}).catch((err) => {
					console.log('[Google Login Error][' + err.code + "] " + err.message);
					reject(err);
				});
		});
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
	}
}
