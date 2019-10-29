<template>
    <v-container
		class="d-flex flex-row ma-0 pa-0"
	>
		<ChatRoom />
    </v-container>
</template>

<script>
import ChatRoom from '@/components/ChatRoom.vue';
// import RoadView from '@/components/RoadView.vue';

export default {
  components: {
	ChatRoom,
	// RoadView
  }
}
</script>
