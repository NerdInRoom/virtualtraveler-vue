<template>
	<div class="chatRoomList">
		<h2>함께할 수 있는 여행</h2>
		<v-list class="chat-list">
			<v-list-item-group
				v-model="model"
				v-if="this.getChatRoomList"
				mandatory
				color="indigo"
			>
				<v-list-item
					:key="room.id"
					v-for="room in this.getChatRoomList.map"
				>
					<v-list-item-content
						@click="selectRoom(room.host.email)"
					> 
						<v-list-item-title>
							{{ room.title }}
						</v-list-item-title>
						<v-list-item-title>
							{{ room.host.nickname }}
						</v-list-item-title>
						<v-list-item-title>
							{{ room.guest.length }} 명이 함께 여행중입니다.
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data: () => ({
		model: 1,
	}),
	computed: {
        ...mapGetters(['getChatRoomList']),
    },
	methods: {
		selectRoom(email){
			const selectedRoom = this.getChatRoomList.get(email);
			this.$store.commit('selectChatRoom', selectedRoom);
		}
	}
}
</script>

<style lang="scss">
	.chatRoomList {
		margin: 10px;
		height: 100%;
		h2 {
			margin-left: 3px;
		}

		.chat-list {
			overflow-y: scroll;
			-ms-overflow-style: none;
			&::-webkit-scrollbar {
				display: none;
			}
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
