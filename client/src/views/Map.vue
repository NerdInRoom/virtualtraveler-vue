<template>
    <div class="map">
        <h1>This is Map-page</h1>
		<router-link :to="{name:'travel', params:{roomId: 1}}" >Travel1</router-link>
    </div>
</template>

<script>

export default {
  components: {
    
  }
}
</script>
