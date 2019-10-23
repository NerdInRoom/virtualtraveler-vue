# Kakao Maps API - RoadView

>

## 로드뷰 생성하기

```
// 로드뷰를 표시할 div
var roadviewContainer = document.getElementById('roadview'); 

// 로드뷰 객체를 생성한다
var roadview = new kakao.maps.Roadview(roadviewContainer); 

// 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
var roadviewClient = new kakao.maps.RoadviewClient(); 

// 로드뷰 위치
var rvPosition = new kakao.maps.LatLng(37.56613, 126.97837);

// rvPosition으로부터의 반경(미터)
var radius = 50;

// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
roadviewClient.getNearestPanoId(rvPosition, radius, function(panoId) {
	roadview.setPanoId(panoId, rvPosition); // panoId와 중심좌표를 통해 로드뷰 실행
});

```

