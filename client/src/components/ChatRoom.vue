<template>
<div class="room">
	<div class="chat-header">
		<h1 class="room-title">윤병이의 강남여행</h1>
		<div class="room-info">
			<span class="room-master">
				채윤병 abcd1234@naver.com
			</span>
			<span class="room-traveler">
				곽빛나라, 강민, 등 4명
			</span>
		</div>
	</div>
	<div class="chat-body">
		<transition-group class="text-area" tag="div">
			<div
				class="message"
				v-for="chat in storedChatLog"
				:key="chat.index"
				v-bind:class="{to: chat.to, from: chat.from}"
			>
				<p v-bind:class="{to: chat.to, from: chat.from}">
					{{ chat.text }}
					<span 
						class="time-stamp"
						v-bind:class="{to: chat.to, from: chat.from}"
					>
						{{ chat.when }}
					</span>
					<span
						class="tail"
						v-bind:class="{to: chat.to, from: chat.from}"
					>
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
export default {
  data: () => ({
	inputText: '',
	storedChatLog: [
						{ index: 1, to: true, from: false, text: "안녕", when: "15:39" },
						{ index: 2, to: false, from: true, text: "그래 안녕", when: "15:39" },
						{ index: 3, to: true, from: false, text: "싸피로 가자", when: "15:40" },
						{ index: 4, to: false, from: true, text: "그랭 근데 긴글을 치면 어떻게 될지 너무너무 궁굼해서 안쳐볼수가 없자나? 3줄까지는 어떨까 나나나나나나나나나나나나나ㅏ나나나난나ㅏㄴ나나나", when: "15:40" }
					]
  }),
  methods: {
	  clearInput() {
		  this.inputText = '';
	  },
	  sendChat() {
		  if(this.inputText === '') return;
		  // Sending Chat logic
	  }
  },
  computed: {
	  // Get ChatLog
  },
  updated() {
	  //this.$emit('scrollBottom');
  }
};
</script>
<style lang="scss" scoped>
	.room {
		display: flex;
		flex-direction: column;
		padding: 0;
		.chat-footer {
			display: flex;
			justify-content: center;
			height: 100px;
			background-color: #F1F1F1;

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
				background-color: #9bbbd4;
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
				&.to {
					padding: 5px 0 5px 40px;
				}
				&.from {
					padding: 5px 40px 5px 0;
					margin-left: 8px;
				}
				p {
					position: relative;
					display: block;
					text-align: left;
					word-break: break-all;
					padding: 13px;
					margin: 10px;
					font-size: 15px;
					font-family: 'Roboto';
					font-weight: 400;
					border-radius: 10px;
					&.to {
						background-color: #fef01b;
						color: black;
						float: right;
					}
					&.from {
						color: black;
						background-color: #ffffff;
						float: left;
					}
				}
			}
			.tail {
				position: absolute;
				bottom: 8px;
				width: 10px;
				height: 10px;
				&.to {
					right: -9px;
					border-bottom: 10px solid #fef01b;
					border-right: 10px solid transparent;
					border-top-right-radius: 10px;
				}
				&.from {
					left: -9px;
					border-bottom: 10px solid #ffffff;
					border-left: 10px solid transparent;
					border-top-left-radius: 10px;
				}
			}
			.time-stamp {
				&.to {
					position: absolute;
					color: #556677;
					font-size: 10px;
					bottom: 3px;
					left: -33px;
				}
				&.from {
					position: absolute;
					color: #556677;
					font-size: 10px;
					bottom: 3px;
					right: -33px;
				}
			}
		}
		.chat-header {
			background-color: #381e1f;
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
				.room-master {
					display: block;
					font-size: 15px;
				}
				.room-traveler {
					display: block;
					margin-top: 5px;
					font-size: 10px;
				}
			}
		}
	}
</style>