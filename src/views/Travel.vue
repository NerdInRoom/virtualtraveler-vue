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
import { mapGetters } from "vuex";

export default {
	components: {
		ChatRoom,
		RoadView,
		BackButton
	},
	computed: {
		...mapGetters(['getOnlineChatRoom'])
	},
	created() {
		this.$store.watch(() => this.getOnlineChatRoom, (chatRoom) => {
				if(!chatRoom){
					this.$router.push('/');
					alert("방장이 퇴장하여 방이 사라졌습니다.");
				}
			}
		);
	},
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