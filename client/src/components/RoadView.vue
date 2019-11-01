<template>
	<div id="roadviewWrapper" class="roadviewWrapper">
		<div id="roadview" class="roadview"></div>
		<v-dialog
			v-model="dialog"
			max-width="390"
		>
			<v-card>
			<v-card-title class="mb-5">🚗 로드뷰 이동은 방장만 가능합니다.</v-card-title>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary darken-1"
					text
					@click="dialog=false"
				>
					OK
				</v-btn>
			</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
/* global kakao */
import kakaomapAPI from '@/api/kakaomapApi.js';

export default {
	data() {
		return {
			roomInfo: null,
			roadviewContainer: null,
			dialog: false
		}
	},
	mounted () {
		this.roomInfo = this.$store.getters.getSelectedChatRoom;
		this.roadviewContainer = document.getElementById('roadview');
		
		kakaomapAPI.initRoadview(this);
		this.checkControlAuthority(); // 방장만 로드뷰 조작
	},
	methods: {
		checkControlAuthority(){
			if (this.roomInfo.host.email !== this.$store.getters.getLoginUser.email) {
				this.roadviewContainer.style.pointerEvents = 'none';
				document.getElementById('roadviewWrapper').addEventListener('click', () => {
					this.dialog=true;
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
		width: 80vw;
	}
</style>