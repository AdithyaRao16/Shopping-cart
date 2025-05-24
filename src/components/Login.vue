<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p>Don't have an account?
        <router-link to="/signup">Signup</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      alert(`Logged in with ${this.email}`);
      this.$router.push('/purchase');
    }
  }
};
</script>

<style src="../assets/login.css"></style>
