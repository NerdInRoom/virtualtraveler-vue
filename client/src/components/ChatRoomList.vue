<template>
	<div class="chatRoom-list">
		<h2>함께할 수 있는 여행</h2>
		<v-list>
			<v-list-item-group
				v-model="model"
				mandatory
				color="indigo"
			>
				<v-list-item
					:key="room.id"
					v-for="room in chatRoomList"
				>
					<v-list-item-content
						@click="setRoomId(chat.roomId)"
					> 
						<v-list-item-title>
							No. {{ room.id }}
						</v-list-item-title>
						<v-list-item-title>
							{{ room.title }}
						</v-list-item-title>
						<v-list-item-title>
							{{ room.host.nickname }}
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<script>
export default {
	data: () => ({
		model: 1,
		chatRoomList: ''
	}),
	mounted() {
		this.$store.watch(() => {
			this.chatRoomList = this.$store.getters.getChatRoomList;
		});
	},
	methods: {
		// setRoomId(roomId) {
		// 	const roomInfo = this.$store.getters.getRoomInfo(Number(roomId));
		// 	this.$store.commit('setRoomInfoForChatDetail', roomInfo);
		// 	this.$store.commit('setDialog');
		// }
	}
}
</script>

<style lang="scss">
	.chatRoom-list {
		margin: 10px;
		height: 100%;
		overflow-y: scroll;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}

		h2 {
			margin-left: 3px;
		}
	}

	h3 {
		margin-top: 0;
	}

	.badge {
		background-color: #777;
	}

	.tabs-left {
		margin-top: 3rem;
	}

	.tab-content {
		margin-left: 45px;

	}

	.tab-content .tab-pane {
		display: none;
		padding: 1.6rem;
		overflow-y: auto;
	}

	.tab-content .active {
		display: block;
	}

	.list-group {
		width: 100%;

	}

	.list-group .list-group-item {
		height: 50px;

	}

	.list-group .list-group-item h4,
	span {
		line-height: 11px;
	}
</style>
