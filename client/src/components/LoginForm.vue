<template>
	<div class="login">
		<v-row
			class="row row-top"
			align="center"
			justify="center"
		>
			<h1>로그인</h1>
		</v-row>
		<v-row
			class="row"
			align="center"
			justify="center"
		>
			<v-form
				class="form-login"
				v-model="valid"
			>
				<v-text-field
					v-model="email"
					:rules="emailRules"
					label="이메일"
					required
				></v-text-field>
				<v-text-field
					@keyup.enter="loginEnter"
					v-model="password"
					:rules="[passwordRules.required, passwordRules.min]"
					:type="show ? 'text' : 'password'"
					label="비밀번호"
				></v-text-field>
				<div class="btn-group">
					<v-btn
						@click="loginWithEmail"
						:disabled="!valid"
						id="btn-login"
						class="btn-login white--text title"
						block
						color="#4285F4"
						large
					>
						로그인
					</v-btn>
					<v-btn
						@click="loginWithGoogle"
						class="btn-login white--text title"
						block
						color="#EA4335"
						large
					>
						<v-icon
							class="icon-google"
						>
							mdi-google
						</v-icon>
						구글로 로그인하기
					</v-btn>
					<v-btn
						to="/auth/signup"
						class="btn-login white--text title"
						block
						color="#34A853"
						large
					>
						메일로 회원가입
					</v-btn>
				</div>
			</v-form>
		</v-row>
	</div>
</template>

<script>

export default {
	data: () => ({
		valid: false,
		show: false,
		nickname: '왓따빡',
		email: '',
		password: '',
		emailRules: [
			v => !!v || '이메일을 입력하세요.',
			v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '유효하지 않은 이메일 입니다.'
		],
		passwordRules: {
			required: value => !!value || '비밀번호를 입력하세요.',
			min: v => v.length >= 8 || '비밀번호는 8자리 이상입니다.',
			//emailMatch: () => ('이메일 또는 비밀번호가 틀렸습니다.'),
		}
	}),
	methods: {
		loginEnter() {
			const loginBtn = document.getElementById('btn-login');
			loginBtn.click();
		},
		async loginWithEmail() {
			try {
				const result = await this.$store.dispatch('loginWithEmail', {
					email: this.email,
					password: this.password,
					nickname: this.nickname
				});
				this.$router.push('/');
			} catch (error) {
				const code = error.code;
				const msg = error.message;

				console.log("[" + code + "] " + msg);
				
				// if(code === 'auth/invalid-email'){
					
				// } else if (code === 'auth/wrong-password'){

				// } else if (code === 'auth/user-not-found'){

				// }
			}
		},
		async loginWithGoogle() {
			try {
				const result = await this.$store.dispatch('loginWithGoogle');
				this.$router.push('/');
			} catch (error) {
				const code = error.code;
				const msg = error.message;

				console.log("[" + code + "] " + msg);
				
				// if(code === 'auth/invalid-email'){
					
				// } else if (code === 'auth/wrong-password'){

				// } else if (code === 'auth/user-not-found'){

				// }
			}
		}
	}
}
</script>

<style scoped>
	.row {
		margin: 10px;
	}
	.row-top {
		margin-top: 50px;
		margin-bottom: 30px;
	}
	.form-login {
		width: 80%;
	}
	.btn-login {
		margin-top: 20px;
	}
	.icon-google {
		margin-right: 10px;
	}
</style>