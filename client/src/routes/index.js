import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@/views/Auth.vue'
import Map from '@/views/Map.vue'
import Travel from '@/views/Travel.vue'
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
	component: Auth,
	children: [
        {
			name: 'login',
			path: 'login',
			component: LoginForm
        },
        {
			name: 'signup',
			path: 'signup',
			component: SignUpForm
        }
      ]
  },
  {
    path: '/',
    name: 'map',
    component: Map
  },
  {
    path: '/travel',
    name: 'travel',
    component: Travel
  }
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
