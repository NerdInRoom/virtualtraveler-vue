<template>
<div class="room">
	<div class="panel"></div>
	<div class="chat-header">
		<h1 class="room-title ya"> {{ this.getSelectedChatRoom.title }} </h1>
		<div class="room-info">
			<span class="room-master">
				<span class="ya">운전자</span> {{ this.getSelectedChatRoom.host.nickname }} <span class="ya">님</span>
			</span>
			<span class="room-traveler">
				<span class="ya">동승자</span> {{ this.guests }} <span class="ya">님</span>
			</span>
		</div>
	</div>
	<div class="chat-body">
		<transition-group class="text-area" tag="div">
			<div
				class="message"
				v-for="chat in storedChatLog"
				:key="chat.id"
			>	
				<p
					v-bind:class="[isMine(chat.sender) ? 'me' : 'others']"
				>
					{{ chat.content }}	
					<span class="name"
							v-bind:class="[isMine(chat.sender) ? 'me' : 'others']">
						{{ chat.sender }}
					</span>
					<span class="time"
							v-bind:class="[isMine(chat.sender) ? 'me' : 'others']">
						{{ chat.createdAt }}
					</span>
				</p>
			</div>
		</transition-group>
	</div>
	<div class="chat-footer">
		<div class="chat-input">
			<input
				class="input-text"
				v-on:keyup.enter="sendChat"
				v-model="inputText"
				placeholder="Message"
				autocomplete="off"
			/>
			<v-icon
				class="sendbtn"
				@click="sendChat"
				size="25"
				color="brown"
			>
				mdi-send
			</v-icon>
		</div>
	</div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import {time} from "../utils/time.js";

export default {
	data: () => ({
		inputText: '',
		storedChatLog: [
							{ id:"0x1231", roomid:"1", sender:"슈슈미밍", content:"안녕하세요.", createdAt: time.getNow().detailTime },
							{ id:"0x1232", roomid:"1", sender:"민강강수월래미콘", content:"네 반갑습니다.", createdAt: time.getNow().detailTime},
							{ id:"0x1233", roomid:"1", sender:"슈슈미밍", content:"안녕히가세요.", createdAt: time.getNow().detailTime},
							{ id:"0x1234", roomid:"1", sender:"민강", content:"네 잘지내요.", createdAt: time.getNow().detailTime},
						]
	}),
	computed: {
		...mapGetters(['getSelectedChatRoom','getLoginUser']),
		guests: function() {
			const people = new Array();
			const guest = this.getSelectedChatRoom.guest;
			for(let i in guest){
				people.push(guest[i].nickname);
			}
			return people.join(', ');
		},
	},
	updated() {
		this.scrollBottom();
	},
	methods: {
		isMine(sender){
			if(sender === this.getLoginUser.nickname) return true;
			else return false;
		},
		clearInput() {
			this.inputText = '';
		},
		sendChat() {
			if(this.inputText === '') return;
			// Sending Chat logic
		},
		scrollBottom(){
			const mainTextArea = document.querySelector('.text-area');
			mainTextArea.scrollTop = mainTextArea.scrollHeight;
		},
	}
};
</script>
<style lang="scss" scoped>
	* {
		font-family: "Roboto";
	}
	.ya {
		font-family: "yg-jalnan";
		font-size: 15px;
	}
	.panel {
		position: fixed;
		opacity: 0.18;
		right: 0;
		height: 100%;
		width: 360px;
		background-color: white;
	}
	.room {
		width: 350px;
		height: 100%;
		position: fixed;
		right: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		padding: 0;
		.chat-footer {
			display: flex;
			justify-content: center;
			height: 100px;
			background-color: transparent;

			.chat-input {
				margin: 15px;
				height: 49px;
				width: 100%;
				border-radius: 7px;
				background-color: white;

				@media screen and (max-width: 1685px) {
					.sendbtn {
						display: none;
					}
				}
				.sendbtn {
					margin-bottom: 5px;
					margin-left: 6%;
					margin-right: 5px;
					color: #381e1f;
					-webkit-transition: all 0.3s ease-in-out;
					-moz-transition: all 0.3s ease-in-out;
					-o-transition: all 0.3s ease-in-out;
					-ms-transition: all 0.3s ease-in-out;
					&:hover {
						opacity: 0.3;
						cursor: pointer;
					}
				}
			}
			.input-text {
				font-size: 16px;
				text-align: center;
				margin-left: 10px;
				margin-top: 14px;
				width: 78%;
				border: none;
				border-right: solid 2px #F1F1F1;
				&:focus {
					outline: none;
				}
			}
		}
		.chat-body {
			height: 100%;
			.text-area {
				// background-color: #EEEEEE;
				background-color: transparent;
				height: 100%;
				width: 100%;
				overflow-y: scroll;
				-ms-overflow-style: none;
				&::-webkit-scrollbar {
					display: none;
				}
			}
			.message {
				width: 98%;
				height: auto;
				overflow: hidden;
				margin-bottom: 10px;
				margin-top: 14px;
				padding: 14px;
				p {
					position: relative;
					display: block;
					text-align: left;
					word-break: break-all;
					padding: 15px;
					margin: 10px;
					font-size: 15px;
					font-family: 'Roboto';
					font-weight: 400;
					&.me {
						border-radius: 30px;
						border-top-right-radius: 0;
						margin-right: -1px;
						color: white;
						background-color: #01579B;
						float: right;
					}
					&.others {
						border-radius: 30px;
						border-top-left-radius: 0;
						color: black;
						background-color: white;
						float: left;
					}
				}
				.name {
					overflow: visible;
					color: white;
					font-family: 'yg-jalnan';
					font-size: 17px;
					top: -19px;
					position: absolute;
					width: max-content;
					&.me {
						right: 5px;
					}
					&.others {
						left: 5px;
					}
				}
				.time {
					color: white;
					font-size: 12px;
					bottom: -17px;
					position: absolute;
					&.me {
						right: 20px;
					}
					&.others {
						left: 20px;
					}
				}
			}
		}
		.chat-header {
			h1 {
				color: #FDD835;
				margin-top: 8px;
				margin-left: 8px;
				margin-bottom: 3px;
				font-size: 25px;
				font-weight: bold;
			}
			.room-info {
				color: white;
				margin-left: 12px;
				margin-bottom: 8px;
				padding: 5px;
				.room-master {
					display: block;
					font-size: 15px;
				}
				.room-traveler {
					display: inline-block;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					width: 280px;
					display: block;
					margin-top: 7px;
					font-size: 13px;
				}
			}
		}
	}
</style>