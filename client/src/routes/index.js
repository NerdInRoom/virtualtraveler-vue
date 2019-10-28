import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import Map from '../views/Map.vue'
import Travel from '../views/Travel.vue'
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'auth',
	component: Auth,
	children: [
        {
          path: '',
          component: LoginForm
        },
        {
          path: 'signup',
          component: SignUpForm
        }
      ]
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  },
  {
    path: '/travel/:roomId',
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
