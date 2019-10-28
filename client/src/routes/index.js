import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Map from '../views/Map.vue'
import Travel from '../views/Travel.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/map',
		name: 'map',
		component: Map
	},
	{
		path: '/travel',
		name: 'travel',
		component: Travel
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes
})

export default router
