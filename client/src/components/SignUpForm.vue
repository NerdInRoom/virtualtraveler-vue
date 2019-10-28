<template>
	<div class="signUp">
		<v-row class="row top-row" align="center" justify="center">
			<h1>회원가입</h1>
		</v-row>
		<v-row class="row" align="center" justify="center">
			<v-form id="login-form" v-model="valid">
			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="이메일"
				required
			></v-text-field>
			<v-text-field
				v-model="password"
				:rules="[rules.required, rules.min]"
				:type="show ? 'text' : 'password'"
				label="비밀번호"
			></v-text-field>
			</v-form>
		</v-row>
		<v-row class="row" align="center" justify="center">
			<v-col id="v-col" cols="4">
				<v-btn @click="signUp" :disabled="!valid" class="login-btn white--text title" color="#34A853" block large>가입</v-btn>
			</v-col>
			<v-col id="v-col" cols="4">
				<v-btn to="/" class="login-btn white--text title" color="#EA4335" block large>취소</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import dbCRUD from '@/api/firebaseAPI.js';

export default {
	name: 'loginForm',
	data: () => ({
		valid: false,
		userName: "민강",
		email: '',
		emailRules: [
		v => !!v || '이메일을 입력하세요.',
		v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '유효하지 않은 이메일 입니다.'
		
		],
		password: '',
		show: false,
		rules: {
			required: value => !!value || '비밀번호를 입력하세요.',
			min: v => v.length >= 8 || '비밀번호는 8자리 이상입니다.',
			//emailMatch: () => ('이메일 또는 비밀번호가 틀렸습니다.'),
		}
	}),
	methods: {
		async signUp(){
		let flag = await dbCRUD.signUp(this.email, this.password, this.userName)
        if(flag){
          this.$router.push('/map')
        }
      }
	}
}
</script>

<style scoped>
	#login-form {
		width: 80%;
	}
	.row {
		margin: 10px;
	}
	.top-row {
		margin-top: 50px;
		margin-bottom: 30px;
	}
	.login-btn {
		margin-top: 20px;
	}
	.icon-google {
		margin-right: 10px;
	}
</style>