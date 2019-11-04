<template>
	<div class="chat-detail">
		<div class="room-info" v-if='isSelected'>
			<h2 class="room-title"> {{ this.getSelectedChatRoom.title }} </h2>
			<h3>🙋‍방장</h3>
			<h4 class="room-host"> {{ this.getSelectedChatRoom.host.nickname }} </h4>
			<h3>🏃‍♀️참가자‍</h3>
			<h4 class="room-guest"> {{ this.guests }} </h4>
			<h3>🧭현재위치</h3>
			<!-- TODO: 주소 넣기 -->
			{{ this.setAddress }}
			<h4 class="address">{{ this.address }}</h4>
		</div>
		
		<div class="service-info" v-else>
			<img class="logo" src="@/images/logo1.png" />
			<div class="text">
				<h1 class="service-name">방구석 여행</h1>
				<h3 class="slogan">웹으로 여행하자!</h3>
			</div>
		</div>
	</div>
</template>

<script>
import kakaomapApi from '@/api/kakaomapApi.js';
import { mapGetters } from 'vuex'

export default {
	data() {
        return {
			address: ''
		}
	},
    computed: {
		...mapGetters(['getSelectedChatRoom','getSelectedId']),
		setAddress : function(){
			let address = '';
			const result = kakaomapApi.getAddress(this.getSelectedChatRoom.location);
			result.then(data=>{ this.address = data; });
		},
		guests: function() {
			const people = new Array();
			const guest = this.getSelectedChatRoom.guest;
			for(let i in guest){
				people.push(guest[i].nickname);
			}
			return people.join(', ');
		},
		isSelected: function() {
			const room = this.getSelectedId;
			if(room){
				return true;
			} else {
				return false;
			}
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
