<template>
	<div class="chat-detail">
		<!-- <div class="service-info">
			<img class="logo" src="@/images/logo1.png" />
			<div class="text">
				<h1 class="service-name">방구석 여행</h1>
				<h3 class="slogan">웹으로 여행하자!</h3>
			</div>
		</div> -->
		<div class="room-info">
			<h2 class="room-title">윤병이의 강남여행</h2>
			<h3>🙋‍방장</h3>
			<h4 class="room-host">에라토스테네스의채</h4>
			<h3>🏃‍♀️참가자‍</h3>
			<h4 class="room-guest">곽빛, 슈밍, 민강, 냠냠맨</h4>
			<h3>🧭현재위치</h3>
			<h4 class="address">강남대로94번길 73</h4>
		</div>

		<!-- <v-dialog :value="getDialog" width="500" @click:outside="setDialog">
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					{{getRoomInfoForChatDetail.roomId}} 번 방
				</v-card-title>

				<v-card-text>
					{{getRoomInfoForChatDetail}}
				</v-card-text>

				<v-btn color="red lighten-2" @click="startChatting(getRoomInfoForChatDetail.roomId)">
					채팅 카즈아
				</v-btn>
				<v-divider></v-divider>

			</v-card>
		</v-dialog> -->
	</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {}
    },
    computed: mapGetters([
        'getRoomInfoForChatDetail',
        'getDialog',
    ]),
    methods: {
        setDialog() {
            this.$store.commit('setDialog');
        },
        startChatting(roomId) {
            this.$router.push({
                name: 'travel',
                params: {
                    roomId
                }
            });
        }
    }
}
</script>

<style lang="scss">
	.chat-detail {	
		display: block;
		height: 40%;
		margin: 15px 15px 0px 15px;
		padding-bottom: 5px;
		border-bottom: 3px dashed gray;
	}
	.service-info {
		margin-top: 35px;
		margin-left: 5px;
	}
	.logo {
		float: left;
	}
	.text {
		float: right;
		padding: 7px;
		margin-right: 11px; 
	}
	.room-info {
		.room-title {
			margin-bottom: 10px;
		}
		.room-host, .room-guest, .address {
			padding: 3px;
			margin-left: 13px;
			margin-bottom: 5px;
		}
	}
	
</style>
