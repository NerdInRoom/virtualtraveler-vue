/* global kakao */
export default {
	// RoadView API
	initRoadview (_this) {
		_this.roadview = new kakao.maps.Roadview(_this.roadviewContainer);
		const roadviewPosition = new kakao.maps.LatLng(
			_this.roomInfo.location.latitude,
			_this.roomInfo.location.longitude
		);
	
		// roadviewClient : 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
		// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다. 반경 50미터 이내
		_this.roadviewClient = new kakao.maps.RoadviewClient();
		_this.roadviewClient.getNearestPanoId(roadviewPosition, 50, function (panoId) {
			_this.roadview.setPanoId(panoId, roadviewPosition); // panoId와 중심좌표를 통해 로드뷰 실행
		});
		_this.roadview.setViewpoint(_this.roomInfo.viewPoint);

		if(!_this.isHost) return;

		kakao.maps.event.addListener(_this.roadview, 'position_changed', () => {
			const changedLocation = _this.roadview.getPosition();
			const changedLocationInfo = {
				latitude: changedLocation.Ha,
				longitude: changedLocation.Ga
			}
			_this.$store.dispatch('setRoomLocation', changedLocationInfo);
		});

		kakao.maps.event.addListener(_this.roadview, 'viewpoint_changed', () => {
			const changedViewPoint = _this.roadview.getViewpoint();
			const viewPoint = {
				pan: changedViewPoint.pan,
				tilt: changedViewPoint.tilt,
				zoom: changedViewPoint.zoom
			}

			const threshold = 5; //이미지가 변화되어야 되는(각도가 변해야되는) 임계 값
			for(let i=0; i<72; i++){ //각도에 따라 변화되는 앵글 이미지의 수가 16개
				if(viewPoint.pan > (threshold * i) && viewPoint.pan < (threshold * (i + 1))){
					if(_this.viewpoint!==i){
						_this.viewpoint = i;
						_this.$store.dispatch('setViewPoint', viewPoint);
					}
				}
			}
		});
	},
	roadviewChangedEventHandler(_this, chatRoom) {
		console.log('Roadview Changed Event!!!')
		_this.roadview.setViewpoint(chatRoom.viewPoint);
		const roadviewPosition = new kakao.maps.LatLng(
			chatRoom.location.latitude,
			chatRoom.location.longitude
		);
		_this.roadviewClient.getNearestPanoId(roadviewPosition, 50, function (panoId) {
			_this.roadview.setPanoId(panoId, roadviewPosition); // panoId와 중심좌표를 통해 로드뷰 실행
		});
	},
	// Map API
	drawMap (mapContainer, position) {
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

			resolve(map);
		})
	},
	createMarker(location){
		return new Promise(resolve => {
			const rvClient = new kakao.maps.RoadviewClient();
			const position = new kakao.maps.LatLng(location.latitude, location.longitude);

			// 로드뷰 가능지점인지 체크
			rvClient.getNearestPanoId(position, 50, function (panoId) {
				const marker = new kakao.maps.Marker({
					position,
					clickable: true
				});
				marker.setDraggable(false);
				resolve(marker);
			});
		});
	},
	createSelectionMarker(location){
		return new Promise(resolve => {
			const rvClient = new kakao.maps.RoadviewClient();
			const position = new kakao.maps.LatLng(location.Ha, location.Ga);

			const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
			// const imageSrc = '../images/car.png';
			const imageSize = new kakao.maps.Size(64, 64);
			const imageOption = {offset: new kakao.maps.Point(27, 69)};
			
			// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
			
			// 로드뷰 가능지점인지 체크
			rvClient.getNearestPanoId(position, 50, function (panoId) {
				const marker = new kakao.maps.Marker({
					position,
					clickable: true,
					image: markerImage
				});
				marker.setDraggable(true);
				resolve(marker);
			});
		});
	},
	getAddress(location){
		return new Promise(resolve =>{
			const geocoder = new kakao.maps.services.Geocoder();
			const coord = new kakao.maps.LatLng(location.latitude, location.longitude);
			geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					resolve(result[0].address.address_name);
				}
			});
		});
	}
}