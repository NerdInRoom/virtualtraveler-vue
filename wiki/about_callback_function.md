### 19.10.25

곽빛나라

----------

1. 문제점

   ``````````````````javascript
    mounted() {
           console.log("mounted() 실행");
           this.loadMap();
           this.getList()
           console.log("mounted 실행 끝 : "+this.map)
    },
   ``````````````````

   1. 처음 mounted(){}에서 getList() 내 drawMarker()를 호출할 때, map 객체 정보가 없음, 하지만 mounted 이후 addMarker() 내 drawMarker()를 호출할 경우 map객체정보가 있음

      ###### 처음 map이 로드될 때 마커의 정보가 맵에 뿌려지지 않음

      ![1571887164030](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\1571887164030.png)

      

   2.  loadMap()의 실행이 끝나기 전에 drawMarker()가 실행됨

      ###### drawMarker()를 할때 map의 객체가 필요

      ###### 하지만 loadMap()에서 map객체를 받아오기 때문에, loadMap()의 실행이 끝나기 전에 drawMarker()가 실행되면 문제가 발생(맵에 마커를 뿌릴 수가 없음)

      ![1571887402278](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\1571887402278.png)

      ![1571902005613](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\1571902005613.png)

      

2. 해결

   1. loadMap() 코드 수정

      * 원래 코드

        ``````````javascript
                loadMap() {
                    const _this = this;
                    if (navigator.geolocation) { // GPS를 지원하면
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var mapContainer = document.getElementById('map')
                            // 지도를 생성한다 
                            var map = new kakao.maps.Map(mapContainer, mapOption);
                            _this.currentlatlng = map.getCenter();
                            kakao.maps.event.addListener(map, 'dragend', function () {
                                _this.currentlatlng = map.getCenter();
                            });
                            _this.map = map;
                        }, function (error) {
                            console.error(error);
                        })
                        console.log("loadMap() if문 끝 : " + _this.map)
                    } 
                    else {
                        alert('GPS를 지원하지 않습니다');
                    }
                    console.log("loadMap() 실행 끝 : " + _this.map)
                },
        ``````````

        ###### map의 객체를 받아오기도 전에 loadMap() 함수가 끝나버림 -> 다음 실행할 method 에 영향이 감

      * 수정 후 코드

        `````````````javascript
                getCurrentGPS() {
                    const _this = this;
                    if (navigator.geolocation) { // GPS를 지원하면
                        navigator.geolocation.getCurrentPosition(function (position) {
                            _this.loadMap(position);
                            _this.getList();
                            _this.drawMarker();
                        }, function (error) {
                            console.error(error);
                        })
                        console.log("getCurrentGPS() if문 끝 : " + _this.map)
                    } else {
                        alert('GPS를 지원하지 않습니다');
                    }
                    console.log("getCurrentGPS() 실행 끝 : " + _this.map)
                },
        `````````````

        ###### 콜백함수 내에서(현재 좌표가 성공적으로 받아와졌을 경우)  필요한 함수를 차례로 호출

        ###### 콜백함수내에서 필요한 함수를 호출하기 때문에 getCurrentGPS() 함수가 먼저 끝나도 영향이 없음

        ![1571966157919](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\1571966157919.png)

      ##### 결론 : JavaScript의 call back 에 대한 이해 필요

      

3. 필요한 지식

   ###### JavaScript의 CallBack

   * 콜백함수 : 어떤 이벤트가 발생한 후, 수행될 함수를 의미함

     ​					다른 함수가 실행을 끝낸 뒤 실행되는(call back)되는 함수

   * 콜백함수가 필요한 이유

     * 자바스크립트는 이벤트 기반 언어이기 때문->자바스크립트는 다음 명령어를 실행하기 전 이전 명렁어의 응답을 기다리기보단, 다른 이벤트들을 기다리며 계속 명령을 수행함

   * 콜백함수 사용시 this객체 유의해야함 : 콜백함수 내에서 this는 전역 객체인 window가 되기 때문

##### 하지만 자바스크립트가 점점 더 복잡해지면서 최근에는 콜백함수를 인자로 넘겨 비동기 처리를 하는 스타일을 피하는 추세 

##### 왜? 콜백함수를 중첩해서 사용하게 되면 계속해서 코드를 들여쓰기 해야하는 '콜백 지옥'현상 발생 

#### 따라서 Promis 나 async/await를 이용하여 해결 ->심화학습 필요 ㅠ.ㅠ
