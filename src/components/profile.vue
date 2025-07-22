<template>
<div class="app-container">
    <VerticalNavbar />
  <div class="profile-container">
    <div class="profile-header">
      <form class="profile-form" @submit.prevent="saveProfile">
        <label for="name">Name</label>
        <input id="name" v-model="name" required />

        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />

        <label for="phone">Phone Number</label>
        <input id="phone" v-model="phone" type="tel" required />

        <label for="address">Address</label>
        <textarea id="address" v-model="address" rows="3" required></textarea>

        <button type="submit">Save Profile</button>
      </form>
    </div>

    <div class="orders-section">
      <h3>Order History</h3>
      <div v-if="orders.length">
        <div v-for="order in orders" :key="order.id" class="order">
          <p><strong>Order ID:</strong> #{{ order.id }}</p>
          <p><strong>Date:</strong> {{ order.date }}</p>
          <p><strong>Total:</strong> ₹{{ order.total.toFixed(2) }}</p>
          <ul>
            <li v-for="item in order.items" :key="item.id">
              {{ item.title }} - ₹{{ item.price.toFixed(2) }} x {{ item.quantity }}
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div v-else>
        <p>No orders found.</p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VerticalNavbar from '@/components/Navbar.vue';
const name = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const orders = ref([])

onMounted(() => {
  // Load saved profile
  const stored = JSON.parse(localStorage.getItem('userProfile'))
  if (stored) {
    name.value = stored.name
    email.value = stored.email
    phone.value = stored.phone
    address.value = stored.address
  }

  // Load order history
  const history = localStorage.getItem('orderHistory')
  orders.value = history ? JSON.parse(history) : []
})

const saveProfile = () => {
  const profile = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value
  }
  localStorage.setItem('userProfile', JSON.stringify(profile))
  alert('Profile saved successfully!')
}
</script>

<style src="@/assets/ProfilePage.css"></style>
