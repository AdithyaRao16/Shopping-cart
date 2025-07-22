<template>
  <div class="app-container">
    <VerticalNavbar :cartCount="cartItems.length" />
    <div class="page-content">
      <h2>My Shopping Cart</h2>

      <div v-if="cartItems.length > 0" class="cart-container">
        <div class="cart-items">
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <div class="item-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="item-details">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-description">{{ item.description }}</p>
              <p class="item-category">Category: {{ item.category }}</p>
            </div>
            <div class="item-price">
              <span class="price-label">Unit Price:</span>
              <span class="price">₹{{ item.price.toFixed(2) }}</span>
            </div>
            <div class="quantity-controls">
              <span class="quantity-label">Quantity:</span>
              <div class="quantity-wrapper">
                <button @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item.id)">+</button>
              </div>
            </div>
            <div class="item-total">
              <span>Total:</span>
              <span>₹{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
            <div class="item-actions">
              <button @click="removeFromCart(item.id)">🗑️</button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Items ({{ totalItems }}):</span>
              <span>₹{{ subtotal.toFixed(2) }}</span>
            </div>
            <hr />
            <div class="summary-row total-row">
              <span>Total:</span>
              <span>₹{{ grandTotal.toFixed(2) }}</span>
            </div>
            <div class="checkout-actions">
              <button @click="continueShopping">Continue Shopping</button>
              <button @click="proceedToCheckout">Checkout</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <h3>Your cart is empty</h3>
        <button @click="continueShopping">Start Shopping</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VerticalNavbar from './Navbar.vue';

const router = useRouter();
const cartItems = ref([]);

const loadCart = () => {
  const cart = localStorage.getItem('cart');
  cartItems.value = cart ? JSON.parse(cart) : [];
};

const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

const increaseQuantity = (id) => {
  const item = cartItems.value.find(i => i.id === id);
  if (item) {
    item.quantity++;
    saveCart();
  }
};

const decreaseQuantity = (id) => {
  const item = cartItems.value.find(i => i.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
    saveCart();
  }
};

const removeFromCart = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
  saveCart();
};

const continueShopping = () => {
  router.push('/purchase');
};

const proceedToCheckout = () => {
  const order = {
    id: Date.now(),
    date: new Date().toISOString().split("T")[0],
    items: cartItems.value,
    total: grandTotal.value
  };
  const history = JSON.parse(localStorage.getItem("orderHistory") || "[]");
  history.push(order);
  localStorage.setItem("orderHistory", JSON.stringify(history));
  cartItems.value = [];
  saveCart();
  alert("Order placed!");
  router.push('/profile');
};

const totalItems = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

const grandTotal = computed(() => subtotal.value);

onMounted(() => {
  loadCart();
});
</script>

<style src="@/assets/cart.css"></style>
