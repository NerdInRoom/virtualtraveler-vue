<template>
	<div>
		<Header />
		<MapMarker></MapMarker>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import MapMarker from '../components/MapMarker.vue'
export default {
    components:{
		Header,
        MapMarker
    }
}
</script>

<style>

</style>