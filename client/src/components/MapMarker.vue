<template>
	<div class="map-wrapper">
		<div class="map" id="mapContainer"></div>
		<ChatRoomInfo />
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

export default {
    components: {
		ChatRoomInfo
    },
    data() {
        return {
			mapContainer: '',
            map: '',
            currentlatlng: '',
            chatRoomList: [],
            markerList: []
        }
    },
    mounted() {
		this.initMap();
		this.$store.watch(async () => {
			this.chatRoomList = await this.$store.getters.getChatRoomList;
			await this.loadMarker();
			await this.drawMarker();
		});
		
	},
    methods: {
		initMap() {
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(async position => {
					this.mapContainer = document.getElementById("mapContainer");
					kakaomapApi.initMap(this, position);
					
				});
			} else {
				console.log("🌎 위치정보 제공에 동의해주세요.");
			}
		},
		async loadMarker() {
			// 채팅방 불러와서 마커로 만들기
			for(const room of this.chatRoomList){
				await kakaomapApi.createMarker(this, room.title, room.location);
			}
			return;
		},
		async drawMarker() {
			// 현재 마커리스트 화면에 뿌리기
			const promises = this.markerList.map(marker => kakaomapApi.drawMarker(this, marker));
			await Promise.all(promises);
			
			return;
		},
		create() {
			const title = 'test room';
			this.$store.commit('createChatRoom', {
				title,
				location: this.currentlatlng
			});
		},
		delete() {

		},
		logout() {
			this.$store.dispatch('logout');
		}
    }
}
</script>

<style lang="scss">
.map {
	height: 100vh;
	width: 100vw;
}
.marker {
	left: 10px;
	bottom: 25px;
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
