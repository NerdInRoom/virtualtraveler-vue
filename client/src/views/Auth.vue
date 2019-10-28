<template>
    <v-content>
		<Background />
		<v-row
			align="center"
			justify="center"
		>
			<v-col class="floating" cols="12">
				<v-card
					id="card-border"
					:elevation="hover ? 12 : 2"
					class="mx-auto"
					height="550"
					max-width="600"
				>
					<transition
						name="fade"
						mode="out-in"
					>
						<router-view></router-view>
					</transition>
				</v-card>
			</v-col>
		</v-row>
    </v-content>
</template>

<script>
import Background from '@/components/Background.vue';

export default {
  components: {
	Background
  },
}
</script>

<style scoped>
	.floating {
		position: absolute;
		bottom: 30%;
	}
	
	/* 클래스 지정자로 속성이 부여되지 않음 */
	#card-border {
		border: 7px solid #444;
		border-radius: 18%;
	}

	/* 로그인 / 회원가입 컴포넌트 변화시 트랜지션 */
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