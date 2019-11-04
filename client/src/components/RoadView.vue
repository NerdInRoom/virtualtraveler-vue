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
import firebaseAPI from '@/api/firebaseApi.js';
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(['getSelectedChatRoom', 'getSelectedId', 'getLoginUser']),
		isHost(){
			return this.getSelectedChatRoom.host.email === this.getLoginUser.email;
		}
	},
	methods: {
			checkControlAuthority(){
				if (!this.isHost) {
					this.roadviewContainer.style.pointerEvents = 'none';
					document.getElementById('roadviewWrapper').addEventListener('click', () => {
						this.dialog=true;
					});
				}
			}
	},
	data() {
		return {
			roadview: null,
			roadviewPosition: null,
			roadviewClient: null,
			roomInfo: null,
			roadviewContainer: null,
			dialog: false,
			unwatch: null,
			unsubscribe: null,
			viewpoint: 0
		}
	},
	async created() {
		console.log('craeted');
		this.unsubscribe = await this.$store.dispatch('fetchChatRoom', this.$store.getters.getSelectedId);
		if(!this.isHost){
			this.unwatch = this.$store.watch(
				() => this.getSelectedChatRoom,
				(chatRoom) => {
					console.log(chatRoom)
					kakaomapAPI.roadviewChangedEventHandler(this, chatRoom);
				}
			);
		}
	},
	async mounted () {
		this.roomInfo = this.$store.getters.getSelectedChatRoom;
		this.roadviewContainer = document.getElementById('roadview');
		await kakaomapAPI.initRoadview(this);
		this.checkControlAuthority(); // 방장만 로드뷰 조작
	},
	beforeDestroy () {
		if(this.unwatch!==null){
			this.unwatch();
		}	
		if(this.unsubscribe!==null){ 
			this.unsubscribe();
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
		width: 100vw;
	}
</style>