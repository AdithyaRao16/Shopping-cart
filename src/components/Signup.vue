<template>
  <div class="form-container">
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Signup</button>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signup() {
      alert(`Signed up as ${this.name}`);
    }
  }
};
</script>
<style src="../assets/signup.css"></style>
