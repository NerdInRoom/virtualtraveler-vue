import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDdghMoTmWMMsno4LHzFyeAR6p8oKWjwRE",
    authDomain: "seungmi-chatting-test.firebaseapp.com",
    databaseURL: "https://seungmi-chatting-test.firebaseio.com",
    projectId: "seungmi-chatting-test",
    storageBucket: "gs://seungmi-chatting-test.appspot.com/",
    messagingSenderId: "746818600428"
}
firebase.initializeApp(firebaseConfig)

const user = {email: "tmdal9516@naver.com", displayName: "최승미"};
const db = firebase.firestore();


// firebase.auth().currentUser를 userStore에 저장된 user정보로 바꿔야함
const dbCRUD = {
    makeChatRoom(roomName, gpsX, gpsY){
        // let user = firebase.auth().currentUser;
		db.collection('chatRoomList').add({
			roomName: roomName,
			roomGpsX: gpsX,
			roomGpsY: gpsY,
			roomHost: user.email,
        }).then((docRef)=>{
            console.log(docRef);
            db.collection('user').doc(user.email).update({
                userHostRoom : docRef.id,
                userGuestRoom : docRef.id
            });
        });
    },
    // 일단 userGuestRoom을 roomId(String)로
	getUserGuestRoom(){
		// let user = firebase.auth().currentUser;
		this.db.collection('user').doc(user.email).get().then(documentSnapshot => {
			let data = documentSnapshot.data();
			return data.userGuestRoom;
		});
    },
    joinRoom(roomId){
        // let user = firebase.auth().currentUser;
        this.db.collection('user').doc(user.email).update({userGuestRoom : roomId});
        this.db.collection('chatRoomList').doc(roomId).collection('roomJoinUser').doc(user.email).set({
            userName: user.displayName
        });
    },
    sendMessage(message){
        // let sender = firebase.auth().currentUser;
        let roomId = getUserGuestRoom();
        this.db.collection('chatRoomList').doc(roomId).collection('messages').add({
            msg: message,
            sender: sender.displayName,
            createdAt: new Date()
        });
    },
    fetchMessage(){
        return new Promise((resolve, reject) => {
            this.db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot)=>{
              let allMessages=[];
              querySnapshot.forEach(doc=>{
                let docu = doc.data();
                docu.id = doc.id;
                allMessages.push(docu);
              })
              store.commit('setMessages',allMessages);
            })
        });
    }
}

export default dbCRUD

