# 채팅 Realtime Database 기반 구현

> 2019.10.22 - 최승미 작성

### Firebase Realtime Databse 특징

- JSON형태의 NoSQL 데이터베이스
- 연결된 모든 클라이언트에 실시간 동기화
- 데이터베이스 구조를 미리 정의하지 않는다.
- 실시간 동기화 되기 때문에 최대한 중첩을 배제해야 한다. (JSON Object에 JSON Object가 중첩이 되는 형태)
- 권한 관리가 가장 중요하다

### 실습 코드의 데이터베이스 구조

- FcmId = Firbase Messaing을 통해 웹 푸시기능 구현 시 필요한 유저별 FCM ID 값
  - 유저UID
  - FCM ID값
- Messages = 채팅방 별 메시지 데이터
  - 채팅방ID 
    - 메시지ID
    - 메시지 세부데이터(내용, 프로필이미지, timestamp, 유저UID, 유저이름)
  - <u>채팅방 이름</u>
  - <u>좌표 값</u>
  - <u>방장UID</u>
- RoomUsers = 채팅방 별 유저 리스트
  - 채팅방ID                                                                                                                                                                                                                                                                                                                                                                                                                 
    - 유저UID
- UserRooms = 유저 별 채팅방 리스트 // 필요는 할듯? 어떤 유저가 가지고 있는지 확인해야할듯
  - 유저UID
    - 채팅방ID
    - 채팅방 세부데이터(마지막 메시지, 프로필이미지, 채팅방ID, timestamp 등)
- Users = 가입한 유저 데이터
  - 유저UID
  - 유저 세부데이터(이메일, 프로필이미지, 유저 이름)
- UserConnection = 유저별 접속여부 기록<u>(우리가 구현할 채팅방에서는 필요 없음)</u>
  - 유저UID
    - 접속여부
    - 마지막 접속 timestamp

### Realtime Database 권한 설정

- 기본 권한: Authentication 인증 받았을 때 읽기, 쓰기 허용
- 채팅방은 인원으로 등록되어 있을 때만 접근 가능(참여중일 때만)
- 채팅방 목록은 본인것만 읽을 수 있음
- <u>추후 우리는 좌표를 방장만 조절할 수 있도록 권한 설정 해야함</u>

