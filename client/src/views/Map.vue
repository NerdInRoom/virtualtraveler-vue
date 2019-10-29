<template>
    <div class="map">
        <h1>This is Map-page</h1>
        <v-btn @click="makeChatRoom">test</v-btn>
    </div>
</template>

<script>

export default {
  components: {
    
  },
  methods: {
      async makeChatRoom(){
        try {
          const result = await this.$store.dispatch('makeChatRoom',{
            roomName: "test",
            gpsX: "12",
            gpsY: "34"
          });
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
  }
}
</script>
