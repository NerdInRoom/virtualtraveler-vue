<template>
    <div class="travel">
		<BackButton />
		<RoadView />
		<ChatRoom />
    </div>
</template>

<script>
import ChatRoom from '@/components/ChatRoom.vue';
import RoadView from '@/components/RoadView.vue';
import BackButton from '@/components/BackButton.vue';

export default {
  components: {
	ChatRoom,
	RoadView,
	BackButton
  },
  created() {
	  window.onpageshow = (event) => {
		  if(event.persisted) {
				console.log("뒤로가기 눌렀음!");
	  			// await firebaseapi.outChatRoom(chatRoom, user);
		  }
	  }
  }
}
</script>
<style scoped>
	.travel{
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: row;
	}
</style>