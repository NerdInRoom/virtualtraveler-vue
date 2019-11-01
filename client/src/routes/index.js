import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
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
			component: LoginForm,
			meta: {
				authRequired: false
			}
        },
        {
			name: 'signup',
			path: 'signup',
			component: SignUpForm,
			meta: {
				authRequired: false
			}
        }
      ]
  },
  {
    path: '/',
    name: 'map',
	component: Map,
	meta: {
		authRequired: true
	}
  },
  {
    path: '/travel',
    name: 'travel',
	component: Travel,
	meta: {
		authRequired: true
	}
  }
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach(function (to, from, next) {
	if(to.matched.some(function (routeInfo) {
		return routeInfo.meta.authRequired;
	})) {
		// 로그인이 필요한 페이지
		const loginState = store.getters.getLoginState;
		if(loginState){
			next();
		} else {
			next('auth/login');
		}
	} else {
		// 로그인이 필요없는 페이지
		const loginState = store.getters.getLoginState;
		if(loginState){
			next(from);
		} else {
			next();
		}
	}
});
