<template>
	<div id="app">
		<Header />
		<div id="nav">
			<router-link to="/">Login</router-link> |
			<router-link to="/main">main</router-link> |
			<router-link to="/travel/1">Travel</router-link>
		</div>
		<router-view />
	</div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
	name: 'travel',
	components: {
		Header
	}
}
</script>