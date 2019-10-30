<template>
	<div id="roadviewWrapper" class="roadviewWrapper">
		<div id="roadview" class="roadview"></div>
	</div>
</template>

<script>
/* global kakao */
import kakaomapAPI from '@/api/kakaomapApi.js';

export default {
	props: ['roomId'],
	data() {
		return {
			roomInfo: null,
			roadviewContainer: null
		}
	},
	mounted () {
		this.roomInfo = this.$store.getters.getRoomInfo(Number(this.roomId));
		this.roadviewContainer = document.getElementById('roadview');
		
		kakaomapAPI.initRoadview(this);
		this.checkControlAuthority(); // 방장만 로드뷰 조작
	},
	methods: {
		checkControlAuthority(){
			if (this.roomInfo.roomOwnerId !== this.$store.getters.getUser.email) {
				this.roadviewContainer.style.pointerEvents = 'none';
				document.getElementById('roadviewWrapper').addEventListener('click', () => {
					alert('너는 방장이 아니다.')
				});
			}
		}
	}
}
</script>
<style scoped>
	.roadviewWrapper {
		display: flex;
		padding: 0;
	}
	.roadview {
		height: 100%;
		width: 85vw;
	}
</style>