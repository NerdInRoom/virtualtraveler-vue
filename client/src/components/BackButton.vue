<template>
	<div class="buttonWrapper">
		<v-btn 
			id="button" icon large color="white"
			@click="dialog=true"
			@mouseover="mouseover"
            @mouseout="mouseout"
		>
			<v-icon>mdi-chevron-double-left</v-icon>
		</v-btn>
		<span v-if="show" style="color:white">나가기</span>
		<v-dialog
			v-model="dialog"
			max-width="390"
		>
			<v-card>
			<v-card-title class="mb-5">채팅방을 나가시겠습니까?</v-card-title>
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
					color="red darken-1"
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
export default {
	data() {
		return {
			show: false,
			dialog: false
		}
	},
	methods: {
		setButtonOpacity(val) {
			document.getElementById('button').style.opacity=val;
		},
		mouseover(){
			this.show = true;
			this.setButtonOpacity(1.0);
		},
		mouseout(){
			this.show = false;
			this.setButtonOpacity(0.4);
		},
		exit(){
			// 나가기전에 뭔가 해야 될 듯...
			this.dialog = true;
			this.$router.go(-1);
		}
	},
	mounted() {
		this.setButtonOpacity(0.4);
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