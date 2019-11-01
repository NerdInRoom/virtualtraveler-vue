/* global kakao */
export default {

	// RoadView API
	initRoadview (_this) {
		const roadview = new kakao.maps.Roadview(_this.roadviewContainer);
		const roadviewPosition = new kakao.maps.LatLng(
			_this.roomInfo.location.latitude,
			_this.roomInfo.location.longitude
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
	},

	// Map API
	drawMap (mapContainer, position, currentLocation) {
		return new Promise(resolve => {
			const mapOption = {
				// 지도 중심 좌표
				center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude),
				// 지도의 확대 레벨
				level: 3,
				// 지도종류
				mapTypeId: kakao.maps.MapTypeId.ROADMAP 
			};
	
			const map = new kakao.maps.Map(mapContainer, mapOption);

			// const center = map.getCenter();
			// currentLocation = {
			// 	latitude: center.Ha,
			// 	longitude: center.Ga
			// }

			// kakao.maps.event.addListener(map, 'dragend', function () {
			// 	const center = map.getCenter();
			// 	currentLocation = {
			// 		latitude: center.Ha,
			// 		longitude: center.Ga
			// 	}
			// 	console.log(currentLocation);
			// });

			resolve(map);
		})
	},
	createMarker(center){
		return new Promise(resolve => {
			const rvClient = new kakao.maps.RoadviewClient();
			const position = new kakao.maps.LatLng(center.Ha, center.Ga);

			// 로드뷰 가능지점인지 체크
			rvClient.getNearestPanoId(position, 50, function (panoId) {
				if(panoId === null) {
					throw new Error('🚗로드뷰를 지원하지 않는 지점입니다.');
				} else {
					const marker = new kakao.maps.Marker({
						position,
						clickable: true
					});
					marker.setDraggable(true);
					resolve(marker);
				}
			});
		});
	},
	drawMarker(map, marker) {
		return new Promise(resolve => {
			resolve(marker.setMap(map));
		});
	}



}