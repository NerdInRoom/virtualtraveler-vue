<template>
    <v-content>
		<Background />
		<v-row
			align="center"
			justify="center"
		>
			<v-col id="v-col" cols="12">
				<v-hover
					v-slot:default="{ hover }"
					disabled
				>
					<v-card
						id="login-card"
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
				</v-hover>
			</v-col>
		</v-row>
    </v-content>
</template>

<script>
import Background from '@/components/Background.vue';

export default {
  name: 'auth',
  components: {
	Background
  },
}
</script>

<style scoped>
	#v-col {
		position: absolute;
		bottom: 30%;
	}
	#login-card {
		border: 7px solid #444;
		border-radius: 18%;
	}
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