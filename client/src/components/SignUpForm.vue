<template>
	<div class="signup">
		<v-row
			class="row row-top"
			align="center"
			justify="center"
		>
			<h1>회원가입</h1>
		</v-row>
		<v-row
			class="row"
			align="center"
			justify="center"
		>
			<v-form
				class="form-signup"
				v-model="valid"
			>
				<v-text-field
					v-model="email"
					:rules="emailRules"
					label="이메일"
					required
				></v-text-field>
				<v-text-field
					v-model="password"
					@keyup.enter="signupEnter"
					:rules="[passwordRules.required, passwordRules.min]"
					:type="show ? 'text' : 'password'"
					label="비밀번호"
				></v-text-field>
			</v-form>
		</v-row>
		<v-row
			class="row"
			align="center"
			justify="center"
		>			
			<v-col 
				v-if="nickname!=''"
				cols="7">
				닉네임 : "{{nickname}}"
			</v-col>
			<v-col 
				v-if="nickname==''"
				cols="7">
				닉네임 : 설정 중......
			</v-col>
			<v-col cols="3">
				<v-btn
					@click="randomNickname"
					large
					color="rgb(142, 33, 165)"
					dark
				>
					<v-icon>
						mdi-refresh
					</v-icon>
					바꾸기
				</v-btn>
			</v-col>
		</v-row>
		<v-row
			class="row"
			align="center"
			justify="center"
		>
			<v-col cols="4">
				<v-btn
					id="btn-signup"
					@click="signup"
					:disabled="!valid"
					class="btn-signup white--text title"
					color="#34A853"
					block
					large
				>
					가입
				</v-btn>
			</v-col>
			<v-col cols="4">
				<v-btn
					to="/auth/login"
					class="btn-signup white--text title"
					color="#EA4335"
					block
					large
				>
					취소
				</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data: () => ({
		valid: false,
		show: false,
		email: '',
		password: '',
		nickname: '',
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
		signupEnter() {
			const loginBtn = document.getElementById('btn-signup');
			loginBtn.click();
		},
		async signup(){
			try {
				const result = await this.$store.dispatch('signup', {
					email: this.email,
					password: this.password,
					nickname: this.nickname
				});
				this.$router.push('/');
			} catch (error) {
				const code = error.code;
				const msg = error.message;

				console.log("[" + code + "] " + msg);
				
				// if(code === 'auth/email-already-in-use'){
					
				// } else if (code === 'auth/invalid-email'){

				// } else if (code === 'auth/weak-password'){

				// }
			}			
		},
		async randomNickname(){
			try{
				const result = await this.$store.dispatch('ramdomNickname');
				this.nickname = this.$store.getters.getNicknameByDraw;
			} catch(error){
				const code = error.code;
				const msg = error.message;
				console.log("[" + code + "] " + msg);
			}
		}
	},
	created() {
		this.randomNickname()
	},
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
	.form-signup {
		width: 80%;
	}
	.btn-signup {
		margin-top: 20px;
	}
	.icon-google {
		margin-right: 10px;
	}
</style>