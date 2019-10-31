<template>
	<v-app>
		<transition
			name="fade"
			mode="out-in"
		>
			<router-view></router-view>
		</transition>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	mounted() {
		this.$store.dispatch('setAuthListener');
		this.$store.watch(() => {
			const loginState = this.$store.getters.getLoginState;
			if(loginState){
				console.log("로그인 상태 입니다.");
			} else {
				console.log("로그인 안된 상태 입니다.");
				this.$router.push('/auth/login');
			}
		});
	},
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

	/* 컴포넌트 변화시 트랜지션 */
	.fade-enter-active,
	.fade-leave-active {
	transition-duration: 0.3s;
	transition-property: opacity;
	transition-timing-function: ease;
	}

	.fade-enter,
	.fade-leave-active {
	opacity: 0
	}
</style>
