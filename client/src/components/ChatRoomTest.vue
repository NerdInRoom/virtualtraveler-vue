<template>
	<div id="test">
		<v-btn @click="makeChatRoom">makeChatRoom</v-btn>
		<v-btn @click="joinRoom">joinRoom</v-btn>
	</div>
</template>
<script>
export default {
	methods: {
		async makeChatRoom(){
    		try {
        		const result = await this.$store.dispatch('makeChatRoom',{
            		roomName: "test",
            		gpsX: "12",
            		gpsY: "34"
          		});
        	} catch (error) {
          		console.log(error);
        	}
		},
		async joinRoom(){
			try {
				const result = await this.$store.dispatch('joinRoom',{
					roomId: "LsQmEs02vpJ7mjDEnomD"
				});
			} catch (error) {
				
			}
		}
	},
	created() {
		this.$store.dispatch('fetchRoomList');
		
	}
}
</script>
	