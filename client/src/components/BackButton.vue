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
import storage from '../utils/storage.js';

export default {
	data() {
		return {
			showText: false,
			dialog: false
		}
	},
	methods: {
		exit(){
			// 방장이면 나가기전에 뭔가 해야 될 듯...
			this.$router.go(-1);
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