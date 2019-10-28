<template>
  <v-app>
    <Login />
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Login from './views/Login.vue';
import Map from './views/Map.vue';
import Travel from './views/Travel.vue';

export default {
  name: 'App',
  components: {
    Login,
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
