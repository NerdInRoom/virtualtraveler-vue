# FireBase

> 2019-10-16 (작성자: 강민)

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
   
   var firebaseConfig = {
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
   var db = firebase.firestore();
   
   ```

   

### firebase DB

- firebase DB는 `realtime database`와 `cloud firestore` 두 가지 버전의 실시간 DB가 존재하는 데, 이 중  `cloud firestore`를 사용할 예정
- 이 둘의 차이점은  https://firebase.google.com/docs/database/rtdb-vs-firestore?hl=ko 을 참고.
- `cloud firestore`는 NoSQL로 **`Collection`** - **`Document`** - **`(key: value)`** 구조로 되어있다
  - **`Collection`** : 데이터 파일들의 집합 
  - **`Document`** : 데이터 파일
  - **`(Key: value)`** :  데이터 파일의 세부 데이터
  - (예) **message(Document)**는 **보낸 사람(Key)이 강민(Value)**이고, **보낸 메세지(Key)는 안녕하세요(Value)**로 구성되다. 이러한 message 다큐먼트들이 모여있는 공간이 **Chat(Collection)**에 있다.



### Firebase JavaScript SDK

-  https://firebase.google.com/docs/reference/js?hl=ko 

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



### 참고

- https://www.youtube.com/watch?v=ifOzAyR1cG4 
- https://firebase.google.com/docs/reference/js?hl=ko 





