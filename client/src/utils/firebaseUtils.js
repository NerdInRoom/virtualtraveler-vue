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

const user = { email: "tmdal9516@naver.com", displayName: "최승미" };
const db = firebase.firestore();


// firebase.auth().currentUser를 userStore에 저장된 user정보로 바꿔야함
const dbCRUD = {
    makeChatRoom(roomName, gpsX, gpsY) {
        // let user = firebase.auth().currentUser;
        db.collection('chatRoomList').add({
            roomName: roomName,
            roomGpsX: gpsX,
            roomGpsY: gpsY,
            roomHost: user.email,
        }).then((docRef) => {
            console.log(docRef);// 현재 참여중인 채팅방 state 저장
            db.collection('user').doc(user.email).update({
                userHostRoom: docRef.id,
                userGuestRoom: docRef.id
            });
        });
    },
    // 일단 userGuestRoom을 roomId(String)로
    // user가 참여한 roomId는 state에 저장되어있으니 가져다 쓸거임....얘는 안쓸수도
    getUserGuestRoom() {
        // let user = firebase.auth().currentUser;
        db.collection('user').doc(user.email).get().then((documentSnapshot) => {
            let data = documentSnapshot.data();
            return data.userGuestRoom;
        });
    },
    async joinRoom(roomId) {
        // let user = firebase.auth().currentUser;
        // state에 현재 참여한 room 정보 저장
        await db.collection('user').doc(user.email).update({ userGuestRoom: roomId });
        await db.collection('chatRoomList').doc(roomId).collection('roomJoinUser').doc(user.email).set({
            userName: user.displayName
        });
    },
    async fetchGPS(){
        let roomId = await getUserGuestRoom(); // state에 저장할 예정..........
        db.collection('chatRoomList').doc(roomId).onSnapshot((documentSnapshot) => {
            let data = documentSnapshot.data();
            // state.roomList 바꾸고
            // 현재 참여중인 채팅방 정보(gps) 바꾸고
            return data;
        });
    },
    fetchRoomList(){
        // 채팅방 리스트 state에 저장할 수 있도록...
        db.collection('chatRoomList').onSnapshot((querySnapshot)=>{
            var roomList = [];
            querySnapshot.forEach(function(doc) {
                roomList.push(doc.data());
            });
            return roomList;
        });
    },
    sendMessage(message) {
        // let sender = firebase.auth().currentUser;
        let roomId = getUserGuestRoom();
        db.collection('chatRoomList').doc(roomId).collection('messages').add({
            msg: message,
            sender: sender.displayName,
            createdAt: new Date()
        });
    },
    fetchMessage() {
        return new Promise((resolve, reject) => {
            db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
                let allMessages = [];
                querySnapshot.forEach(doc => {
                    let docu = doc.data();
                    docu.id = doc.id;
                    allMessages.push(docu);
                })
                store.commit('setMessages', allMessages);
            })
        });
    }
}

export default dbCRUD