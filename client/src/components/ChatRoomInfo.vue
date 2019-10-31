<template>
	<div class="chat-info">
		<ChatRoomDetail />
		<ChatRoomList />
	</div>
</template>

<script>
import ChatRoomDetail from "@/components/ChatRoomDetail.vue";
import ChatRoomList from "@/components/ChatRoomList.vue";

export default {

	components : {
		ChatRoomDetail,
		ChatRoomList
	}
}
</script>

<style lang="scss">
	.chat-info {
		position: fixed;
		display: flex;
		flex-direction: column;
		z-index: 9999;
		left: 10px;
		top: 10px;
		height: 700px;
		width: 300px;
		background-color: #FFF8E1;
		border-radius: 30px
	}
</style>
