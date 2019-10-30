/* global kakao */

export default {
	initRoadview (roadviewContainer, roomInfo, _this) {
		const roadview = new kakao.maps.Roadview(roadviewContainer);
		const roadviewPosition = new kakao.maps.LatLng(
			roomInfo.roomGPS.latitude,
			roomInfo.roomGPS.longitude
		);
	
		// roadviewClient : 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
		// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다. 반경 50미터 이내
		const roadviewClient = new kakao.maps.RoadviewClient();
		roadviewClient.getNearestPanoId(roadviewPosition, 50, function (panoId) {
			roadview.setPanoId(panoId, roadviewPosition); // panoId와 중심좌표를 통해 로드뷰 실행
		});
	
		kakao.maps.event.addListener(roadview, 'position_changed', () => {
			const changedLocation = roadview.getPosition();
			const changedLocationInfo = {
				roomId: Number(_this.roomId),
				latitude: changedLocation.Ha,
				longitude: changedLocation.Ga
			}
			_this.$store.commit('setRoomLocation', changedLocationInfo);
		});
	}
}