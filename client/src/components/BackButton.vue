<template>
	<div class="buttonWrapper">
		<v-btn 
			id="button" icon large
			@click="exit"
			@mouseover="mouseover"
            @mouseout="mouseout"
		>
			<v-icon>mdi-chevron-double-left</v-icon>
		</v-btn>
		<span v-if="show">채팅방 나가기</span>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: false
		}
	},
	methods: {
		mouseover(){
			this.show = true;
			document.getElementById('button').style.color="black";
		},
		mouseout(){
			this.show = false;
			document.getElementById('button').style.color='grey';
		},
		exit(){
			// 나가기전에 뭔가 해야 될 듯...
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