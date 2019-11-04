<template>
	<div class="buttonWrapper">
		<v-btn 
			id="button" icon large color="white"
			@click="dialog=true"
			@mouseover="showText=true"
            @mouseout="showText=false"
		>
			<v-icon>mdi-chevron-double-left</v-icon>
		</v-btn>
		<span v-if="showText" style="color:white">나가기</span>
		<v-dialog
			v-model="dialog"
			max-width="390"
		>
			<v-card>
			<v-card-title class="mb-5">🎈 채팅방을 나가시겠습니까?</v-card-title>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary darken-1"
					text
					@click="exit"
				>
					Yes
				</v-btn>
				<v-btn
					color="warning"
					text
					@click="dialog = false"
				>
					No
				</v-btn>
			</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import firebaseapi from '../api/firebaseApi.js';
import storage from '../utils/storage.js';

export default {
	data() {
		return {
			showText: false,
			dialog: false
		}
	},
	computed: {
		...mapGetters(['getLoginUser', 'getOnlineChatRoom']),
	},
	methods: {
		async exit(){
			const user = this.getLoginUser;
			const chatRoom = this.getOnlineChatRoom;
			if(user.uid === chatRoom.host.uid){
				// 호스트가 나갈 때
			} else {
				// 게스트가 나갈 때
				await firebaseapi.outChatRoom(chatRoom, user);
			}
			this.$router.push('/');
		}
	}
}
</script>
<style scoped>
	.buttonWrapper {
		position: fixed;
		z-index: 1;
		margin: 15px 10px;
	}
</style>