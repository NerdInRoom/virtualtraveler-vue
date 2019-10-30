<template>
    <div class="travel">
		<RoadView
          :roomId=$route.params.roomId
        />
		<ChatRoom />
    </div>
</template>

<script>
import ChatRoom from '@/components/ChatRoom.vue';
import RoadView from '@/components/RoadView.vue';

export default {
  components: {
	ChatRoom,
	RoadView
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