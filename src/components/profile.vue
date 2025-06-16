<template>
  <div class="profile-container">
    <div class="profile-header">
     
      <div>
        <h2>Adithya M</h2>
        <p>adithya@example.com</p>
      </div>
    </div>

    <div class="orders-section">
      <h3>Order History</h3>
      <div v-if="orders.length > 0">
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
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      orders: []
    };
  },
  mounted() {
    const history = localStorage.getItem("orderHistory");
    this.orders = history ? JSON.parse(history) : [];
  }
};
</script>

<style src="@/assets/ProfilePage.css"></style>
