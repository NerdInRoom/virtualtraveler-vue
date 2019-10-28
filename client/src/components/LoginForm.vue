<template>
	<div class="login">
		<v-row class="row top-row" align="center" justify="center">
			<h1>로그인</h1>
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
				<div class="btn">
					<v-btn @click="login" :disabled="!valid" class="login-btn white--text title" block color="#4285F4" large>로그인</v-btn>
					<v-btn @click="googleLogin" class="login-btn white--text title" block color="#EA4335" large>
						<v-icon class="icon-google">
							mdi-google
						</v-icon>
							구글로 로그인하기</v-btn>
					<v-btn to="/signup" class="login-btn white--text title" block color="#34A853" large>메일로 회원가입</v-btn>
				</div>
			</v-form>
		</v-row>
	</div>
</template>

<script>

import firebase from 'firebase'

export default {
	name: 'loginForm',
	data: () => ({
		valid: false,
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
		},
     
	}),
	methods: {
    login(){
		const email = this.email
		const password = this.password

		this.$store.dispatch('emailLogin', { email, password })
		.then((user) => {
			this.$router.push('/map')
		}).catch((err) => {
			alert(err)
		})
	},
	googleLogin(){
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...
            
            this.$router.push('/');
            }).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
            alert(errorCode);
        });
    },
  },
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