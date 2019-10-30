<template>
<div>
    <div id="map" style="width:100%;height:600px;"></div>
    <div style="background-color:pink">
        <h3>리스트할거야</h3>
        <chattingList></chattingList>
    </div>
    <button @click="addMarker()">마커 만들기</button>
</div>
</template>

<script>
import chattingList from './ChattingList.vue'
import ChattingDetail from './ChattingDetail.vue'
export default {
    components: {
        chattingList: chattingList,
        ChattingDetail: ChattingDetail
    },
    data() {
        return {
            rvClient: '',
            markers: [],
            map: '',
            currentlatlng: '',
            chattingList: [],
        }
    },
    created() {},
    mounted() {
        this.getCurrentGPS();
    },
    methods: {
        addChatting(position, roomId){
			const email = this.$store.getters.getLoginUser.email;
			
			this.$store.commit('addRoom', {
				roomId : roomId,
                roomGPS  : {
                    latitude: position.Ha,
                    longitude: position.Ga
                },
                roomOwnerId : email
			});
        },
        checkRoadview(position, roomId, marker) {
            const vue = this;
            this.rvClient.getNearestPanoId(position, 50, function (panoId) {
                if (panoId === null) {
                    alert('로드뷰 안됨');
                } else {
                    vue.$store.commit('setRoomLocation', {
                        roomId: Number(roomId),
                        latitude: position.Ha,
                        longitude: position.Ga
                    });
                    const roomInfo = vue.$store.getters.getRoomInfo(Number(roomId));
                    vue.$store.commit('setRoomInfoForChatDetail', roomInfo);
                    vue.$store.commit('setDialog');

                }
            });
        },
        getChattingList() {
            this.chattingList = this.$store.getters.getRoomList;
            const _this = this;
            this.chattingList.forEach(function (element) {
                var markerPosition = new kakao.maps.LatLng(element.roomGPS.latitude, element.roomGPS.longitude);
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition,
                    clickable: true,
                    title: element.roomId
                });
                kakao.maps.event.addListener(marker, 'click', function () {
                    _this.checkRoadview(marker.getPosition(), marker.getTitle(), marker);
                });
                _this.markers.push(marker);
            });
            this.drawMarker();
        },
        addMarker() {
            const _this = this;
            let newRoomId = this.chattingList.length + 1;

            var markerPosition = new kakao.maps.LatLng(this.currentlatlng.Ha, this.currentlatlng.Ga);
            var marker = new kakao.maps.Marker({
                position: markerPosition,
                clickable: true,
                title: newRoomId
            });

            marker.setDraggable(true);
            _this.addChatting(markerPosition, newRoomId);
            kakao.maps.event.addListener(marker, 'click', function () {
                _this.checkRoadview(marker.getPosition(), marker.getTitle(), marker);
            });

            marker.setMap(_this.map);
        },
        drawMarker() {
            const _this = this;
            this.markers.forEach(function (element) {
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
                    _this.getChattingList();
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
