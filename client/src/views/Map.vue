<template>
	<div class="map-wrapper">
		<div class="map" id="mapContainer"></div>
		<ChatRoomInfo />
        <img
			src="@/images/scooter.png"
			class="start"
			@click="start()"
		/>
		<img
			src="@/images/location.png"
			class="marker"
			@click="create()"
		/>
		<img
			src="@/images/unlocked.png"
			class="logout"
			@click="logout()"
		/>
	</div>
</template>

<script>

import ChatRoomInfo from '@/components/ChatRoomInfo.vue';
import kakaomapApi from '@/api/kakaomapApi.js';
import { mapGetters } from "vuex";
import { HashMap } from '../utils/hashMap.js';


export default {
    components: {
        ChatRoomInfo
    },
    data() {
        return {
            map: '',
            currentLocation: ''
        }
    },
    computed: {
        ...mapGetters(['getChatRoomList', 'getLoginUser']),
    },
    mounted() {
        navigator.geolocation.getCurrentPosition(position => { this.init(position) }, this.failToGetGeoInfo);
        this.$store.watch(() => this.getChatRoomList.map, n => { this.drawMarker(); })
    },
    methods: {
        async init(position) {
            const mapContainer = document.getElementById("mapContainer");
            // 맵 초기화
            this.map = await kakaomapApi.drawMap(mapContainer, position, this.currentLocation);
            // 마커 그리기
            await this.drawMarker();
        },
        failToGetGeoInfo() {
            // 위치 정보 수집 실패 핸들링
            alert("위치 정보를 받아오는데 실패하였습니다.");
        },
        async create() {
            const loginUserEmail = this.getLoginUser.email;
            if(this.getChatRoomList.containsKey(loginUserEmail)){
                alert("이미 생성하였습니다.");
                return;
            }
            const center = this.map.getCenter();
            const marker = await kakaomapApi.createMarker(center);
            await this.$store.dispatch('createChatRoom', {
                title: "일단 아무거나",
                latitude: center.Ha,
                longitude: center.Ga,
                marker
            });
        },
        async drawMarker() {
            const markers = new Array();
            const values = this.getChatRoomList.values();

            for(let room in values){
                markers.push(values[room].location.marker);
            }

            const promises = markers.map(marker => kakaomapApi.drawMarker(this.map, marker));

			await Promise.all(promises);
			
			return;
        },

        async logout() {
            await this.$store.dispatch('logout');
            this.$router.push('/auth/login');
        }
    }
}
</script>

<style lang="scss">
.map {
	height: 100vh;
	width: 100vw;
}
.start {
	left: 325px;
	top: 10px;
	position: fixed;
	height: 64px;
	width: 64px;
	border-radius: 50px;
	cursor: pointer;
	z-index: 9999;

	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	&:hover {
		opacity: 0.7;
		cursor: pointer;
	}
}
.marker {
	left: 400px;
    top: 10px;
	position: fixed;
	height: 64px;
	width: 64px;
	border-radius: 50px;
	cursor: pointer;
	z-index: 9999;

	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	&:hover {
		opacity: 0.7;
		cursor: pointer;
	}
}

.logout {
	right: 10px;
	top: 10px;
	position: fixed;
	height: 64px;
	width: 64px;
	border-radius: 50px;
	cursor: pointer;
	z-index: 9999;

	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	&:hover {
		opacity: 0.7;
		cursor: pointer;
	}
}
</style>