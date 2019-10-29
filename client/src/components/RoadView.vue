<template>
	<v-container
		id="roadviewWrapper"
		class="room d-flex flex-column"
	>
		<div id="roadview" style="width:70vw; height:100vh;"></div>
	</v-container>
</template>

<script>
/* global kakao */
export default {
	props: ['roomId'],
	async mounted () {
		const roomInfo = this.$store.getters.getRoomInfo(Number(this.roomId));
		const roadviewContainer = document.getElementById('roadview');
		
		console.log('방장 : '+roomInfo.roomOwnerId);
		// 방장이 아닌 경우 로드뷰 클릭 방지
		if (roomInfo.roomOwnerId !== this.$store.getters.getUser.email) {
			roadviewContainer.style.pointerEvents = 'none';
			document.getElementById('roadviewWrapper').addEventListener('click', () => {
				alert('너는 방장이 아니다.')
			});
		}

		const roadview = new kakao.maps.Roadview(roadviewContainer);
		const rvPosition = new kakao.maps.LatLng(
			roomInfo.roomGPS.latitude,
			roomInfo.roomGPS.longitude
		);

		// roadviewClient : 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
		// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다. 반경 50미터 이내
		let roadviewClient = new kakao.maps.RoadviewClient();
		roadviewClient.getNearestPanoId(rvPosition, 50, function (panoId) {
			roadview.setPanoId(panoId, rvPosition); // panoId와 중심좌표를 통해 로드뷰 실행
		});

    	// 로드뷰 지도 좌표 변화 이벤트를 등록한다
    	const vue = this;
	    kakao.maps.event.addListener(roadview, 'position_changed', () => {
			const changedLocation = roadview.getPosition();
			const changedLocationInfo = {
				roomId: Number(vue.roomId),
				latitude: changedLocation.Ha,
				longitude: changedLocation.Ga
			}
			vue.$store.commit('setRoomLocation', changedLocationInfo);
		})
	}
}
</script>
<style scoped>
	#roadviewWrapper {
		display: block;
		padding: 0;
	}
</style>
