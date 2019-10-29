<template>
    <div class="travel">
        <RoadView
          :roomId=$route.params.roomId
        />
    </div>
</template>

<script>
import RoadView from '@/components/RoadView.vue';

export default {
	name: 'travel',
	components: {
		RoadView
	}
}
</script>
