<template>
<div>
    <div id="map" style="width:100%;height:600px;"></div>
    <button @click="addMarker()">마커 만들기</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            rvClient:'',
            markers: [],
            map: '',
            currentlatlng: '',
            chattingList: []
        }
    },
    created() {},
    mounted() {
        this.getCurrentGPS();
    },
    methods: {
        addChatting(position, roomId){
            let roomListInStore = this.$store.state.mapStore.roomList;
            roomListInStore.push({
                roomId : roomId,
                roomGPS  : {
                    latitude: position.Ha,
                    longitude: position.Ga
                },
                roomOwnerId : Math.floor(Math.random() * 1000)
            });
        },
        checkRoadview(position, roomId) {
            const _this = this;
            _this.rvClient.getNearestPanoId(position, 50, function (panoId) {
                if (panoId === null) {
                    alert('로드뷰 안됨');
                } else {
                    console.log('로드뷰 가능 : ' + roomId);

                }
            });
        },
        getList() {
            const _this = this;
            this.chattingList = this.$store.state.mapStore.roomList; //여 기는 파베
            this.chattingList.forEach(function (element) {
                var markerPosition = new kakao.maps.LatLng(element.roomGPS.latitude, element.roomGPS.longitude);
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                    clickable: true,
                    title : element.roomId
                });
                marker.setDraggable(true);
                kakao.maps.event.addListener(marker, 'click', function () {
                    _this.checkRoadview(marker.getPosition(), marker.getTitle());
                });
                _this.markers.push(marker);
                element.markerObj = marker;
            });
            this.drawMarker();
        },
        addMarker() {
            const _this = this;
            let roomListInStore = this.$store.state.mapStore.roomList;
            let newRoomId = roomListInStore.length+1;
            // 마커가 표시될 위치입니다 
            var markerPosition = new kakao.maps.LatLng(this.currentlatlng.Ha, this.currentlatlng.Ga);
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition,
                clickable: true,
                title : newRoomId
            });

            // 마커가 드래그 가능하도록 설정합니다 
            marker.setDraggable(true);

            _this.addChatting(markerPosition, newRoomId);
            kakao.maps.event.addListener(marker, 'click', function () {
                _this.checkRoadview(marker.getPosition(),marker.getTitle());
            });

            this.markers.push(marker);
            this.drawMarker();
        },
        drawMarker() {
            const _this = this;
            this.markers.forEach(function(element){
                element.setMap(_this.map);
            });
        },
        loadMap(position) {
            const _this = this;
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), // 지도의 중심좌표
                    level: 3, // 지도의 확대 레벨
                    mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
                };
            // 지도를 생성한다 
            var map = new kakao.maps.Map(mapContainer, mapOption);
            _this.currentlatlng = map.getCenter();
            kakao.maps.event.addListener(map, 'dragend', function () {
                _this.currentlatlng = map.getCenter();
            });
            _this.map = map;
            var rvClient = new kakao.maps.RoadviewClient(); 
            _this.rvClient = rvClient;
        },
        getCurrentGPS() {
            const _this = this;
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    _this.loadMap(position);
                    _this.getList();
                    _this.drawMarker();
                }, function (error) {
                    console.error(error);
                });
            } else {
                alert('GPS를 지원하지 않습니다');
            }
        },
    }
}
</script>

<style>

</style>
