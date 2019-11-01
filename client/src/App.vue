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
		navigator.geolocation.getCurrentPosition(this.permision_granted, this.permision_denide);
	},
	methods: {
		permision_denide() {
			alert("방구석 여행 서비스는 위치 정보가 반드시 필요합니다. 위치 정보 수집을 허가해주세요.");
		},
		permision_granted() {
			console.log("위치 정보 수집 허가");
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
