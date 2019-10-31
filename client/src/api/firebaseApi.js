import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import randomName from '../utils/randomName.js';

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
