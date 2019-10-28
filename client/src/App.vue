<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Auth from './views/Auth.vue';
import Map from './views/Map.vue';
import Travel from './views/Travel.vue';

export default {
  name: 'App',
  components: {
    Auth,
    Map,
    Travel
  },
  data: () => ({
    //
  }),
};
</script>
<style>
	@font-face { 
		font-family: 'yg-jalnan';
		src:url( fonts/yg-jalnan.woff );
	}

	* { 
		font-family: 'yg-jalnan';
	}
</style>
