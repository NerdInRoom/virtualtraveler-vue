import store from '@/store/index.js'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

//firebase 초기 환경 설정
const firebaseConfig = {
	apiKey: "AIzaSyDTUkBmOKTMBSyanz8aE9lVpTZ7N_arbT4",
	authDomain: "vue-fb-chat-test.firebaseapp.com",
	databaseURL: "https://vue-fb-chat-test.firebaseio.com",
	projectId: "vue-fb-chat-test",
	storageBucket: "vue-fb-chat-test.appspot.com",
	messagingSenderId: "294332183075",
	appId: "1:294332183075:web:b897ddecb6df108a2ef796"
  };

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

// firebase DB의 CRUD기능과 firebase auth의 기능을 포함한 개체
// store측에서 이 개체 기능을 사용
// 아직은 미완성 이므로 추후 따로 module화 하여 적용할 예정
const dbCRUD = {
    sendMessage(message){
        let sender = firebase.auth().currentUser
        db.collection('chat').add({
            msg: message,
            author: sender.displayName,
            createdAt: new Date()
        })
    },
    fetchMessage(){
        return new Promise((resolve, reject) => {
            db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot)=>{
              let allMessages=[];
              querySnapshot.forEach(doc=>{
                let docu = doc.data()
                docu.id = doc.id;
                allMessages.push(docu)
              })
              store.commit('setMessages',allMessages)
            })
          })
    },
    infoID(id){
        db.collection('chat').doc(id).get().then(documentSnapshot => {
            let data = documentSnapshot.data()
            console.log(data)
        })
    },
    async signUp(email, password, userName){
        let flag = false
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{
            let user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: userName
            });
            flag = true
        }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // ...
            alert(errorCode + errorMessage);
        });
        return flag
    },
    logout(){
        console.log("try logout2")
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    },
    authConfirm(){
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user=>{
              if(user){
                store.commit('setUser',user)
                resolve(user) 
              }
              else{
                reject('not login')
              }
            })
        })
    },
    emailLogin(email, password){
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
              resolve(user)
            }).catch((err) => {
              reject(err)
            })
        })
    }
}

export default dbCRUD
// window.db = db;
// db.settings({
//   timestampsInSnapshots: true
// })

