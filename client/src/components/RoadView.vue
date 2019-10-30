<template>
	<div id="roadviewWrapper">
		<div id="roadview" style="width:100%; height:100vh;"></div>
	</div>
</template>

<script>
/* global kakao */
import kakaomapAPI from '@/api/kakaomapApi.js';

export default {
	props: ['roomId'],
	mounted () {
		const roomInfo = this.$store.getters.getRoomInfo(Number(this.roomId));
		const roadviewContainer = document.getElementById('roadview');
		
		kakaomapAPI.initRoadview(roadviewContainer, roomInfo, this);
		this.checkControlAuthority(roomInfo, roadviewContainer); // 방장만 로드뷰 조작
	},
	methods: {
		checkControlAuthority(roomInfo, roadviewContainer){
			if (roomInfo.roomOwnerId !== this.$store.getters.getUser.email) {
				roadviewContainer.style.pointerEvents = 'none';
				document.getElementById('roadviewWrapper').addEventListener('click', () => {
					alert('너는 방장이 아니다.')
				});
			}
		}
	}
}
</script>
