# FireBase

> 2019-10-16 (작성자: 강민) , 2019-10-22 (작성자: 강민), 2019-10-23 (작성자: 강민)

### 환경 설정과정

1. https://console.firebase.google.com/ 에서 프로젝트 생성

2. 프로젝트 생성 후 web 앱 추가 생성

3. 앱 생성 후 프로젝트 설정(톱니바퀴 아이콘)에서 `Firebase SDK snippet` 에서 환경 설정 코드를 복사

4. 복사된 코드를 main.js (혹은 따로 firebase service js 파일을 생성)에 붙여 넣기

   ```javascript
   /*
    * FireBase의 설정 부분
    */
   import firebase from 'firebase'
   
   require("firebase/firestore");
   
   const firebaseConfig = {
     apiKey: "여기에 api키가 자동 생성되있음",
     authDomain: "여기에 firebase domain이 자동 생성 되있음",
     databaseURL: "여기에 DB URL이 자동 생성 되있음",
     projectId: "여기에 프로젝트ID가 자동 생성 되있음",
     storageBucket: "여기에 storageBucket이 자동 생성 되있음",
     messagingSenderId: "여기에 messagingSenderId가 자동 생성 되있음",
     appId: "여기에 appID가 자동 생성 되있음"
   };
   
   //파이어베이스 초기 환경 설정
   firebase.initializeApp(firebaseConfig)
   
   //파이어베이스의 cloud firestore를 사용
   const db = firebase.firestore();
   
   ```




### firebase 로그인 인증

- https://firebase.google.com/docs/auth/web/start?hl=ko 

- firebase Authentification 항목의 '로그인 방법'으로 인증 방법들을 설정이 가능.

- **이메일 / 비밀번호**를 이용한 **신규 사용자 가입** (가입 후에는 자동으로 로그인이 된다)

  ```javascript
  firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=>{
  	/*
  	 * email과 비밀번호만을 user로 만들어 주는 것을 확장하는 파트,
       * 여기서는 user의 이름을 update하는 형식
       */
      var user = firebase.auth().currentUser;
      user.updateProfile({
  		displayName: this.userName
  	});
      this.$router.push('/');
  }).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	// ...
  	alert(errorMessage);
  });
  ```

- **이메일 / 비밀번호**를 이용한 **로그인**

  ```javascript
  firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=>{
  	this.$router.push('/');
  }).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	// ...
  	alert(errorMessage);
  });
  ```

- **구글 계정**을 이용한 **로그인**

  ```javascript
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
  firebase.auth().signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //        
      this.$router.push('/');
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(errorCode);
  });
  ```



### firebase DB

- firebase DB는 `realtime database`와 `cloud firestore` 두 가지 버전의 실시간 DB가 존재하는 데, 이 중  `cloud firestore`를 사용할 예정
- 이 둘의 차이점은  https://firebase.google.com/docs/database/rtdb-vs-firestore?hl=ko 을 참고.
- `cloud firestore`는 NoSQL로 **`Collection`** - **`Document`** - **`(key: value)`** 구조로 되어있다
  - **`Collection`** : 데이터 파일들의 집합 
  - **`Document`** : 데이터 파일
  - **`(Key: value)`** :  데이터 파일의 세부 데이터
  - (예) **message(Document)**는 **보낸 사람(Key)이 강민(Value)**이고, **보낸 메세지(Key)는 안녕하세요(Value)**로 구성되다. 이러한 message 다큐먼트들이 모여있는 공간이 **Chat(Collection)**에 있다.



### Firestore database Function

- https://firebase.google.com/docs/reference/js?hl=ko 

- Document 추가 함수

  ```javascript
  db.collection('chat').add({
  	msg:this.msg,
      createdAt: new Date()
  })
  ```

  chat이란 collection에 msg와 createdAt이 담긴 document저장

- Document 불러오는 함수

  ```javascript
  db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot)=>{
  	let allMessages=[];
  	querySnapshot.forEach(doc=>{
  		allMessages.push(doc.data())
  	})
      this.msgs = allMessages;
  })
  ```

  chat이란 collection에서 createdAt기준으로 정렬된 Document들을 allMessages란 변수에 push하고 이를 this.msgs에 반영



### Firestore 데이터 가져오기

- **메소드를 호출하는 get()** & **데이터 변경 이벤트를 수신하는 리스너 Onsnapshot()**

- get()

  - 문서를 가져오는 메소드

  - 문서가 변경이 되었을 시 다시 get()을 호출해야 함. 즉, get() 호출 이후의 변경 사항들은 반영이 안됨.

  - 쿼리를 실행하여 QuerySnapshot(해당 쿼리의 결과물) 형태로 return

    ```javascript
    db.collection("cities").doc("SF").get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    ```

- onSnapshot()

  - 데이터 변경 이벤트를 수신하는 리스너

  - 문서가 변경시 콜백이 호출되어 변경사항을 업데이트 됨

  - 리스너 방식으로 데이터 변경사항을 주시하므로, 실시간으로 업데이트가 되는 구조 

    ```javascript
    db.collection("cities").doc("SF").onSnapshot(function(doc) {
    	console.log("Current data: ", doc.data());
    }, function(error){
        console.log("Error getting document:", error);
    });
    ```

    



### 참고

- https://www.youtube.com/watch?v=ifOzAyR1cG4 
- https://firebase.google.com/docs/reference/js?hl=ko 



(!!) 참여 중인 방이 폭파 될때는?

(!!) timestamp를 원하는 date format으로 => util.js

