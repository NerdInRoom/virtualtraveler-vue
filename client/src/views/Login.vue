<template>
    <v-content>
		<Background />
		<LoginForm />
    </v-content>
</template>

<script>
import Background from '@/components/Background.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'login',
  components: {
    Background,
    LoginForm
  },
}
</script>

<style scoped>
</style>