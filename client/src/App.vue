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
import firebaseApi from '@/api/firebaseApi.js';

export default {
  name: 'App',
  created() {
	  const user = firebaseApi.checkState();
	  
	  if(user){
		  // 저장된 user와 로그인된 user를 비교해서 다르면 바꿔줘야함
		  console.log("Checked user");
		  console.log(user);
		  console.log("Logged user");
		  console.log(this.$store.getters.getUser);
	  } else {
		  this.$store.commit('updateUser', '');
		  this.$router.push('/auth/login');
	  }
  }
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
