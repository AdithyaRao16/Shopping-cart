<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email.value" placeholder="Email" required />
      <input type="password" v-model="password.value" placeholder="Password" required />
      <button type="submit">Login</button>
      <p>
        Don't have an account?
        <router-link to="/signup">Signup</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

function login() {
  alert(`Logged in with ${email.value}`);
  router.push('/purchase');
}
</script>

<style src="../assets/login.css"></style>
