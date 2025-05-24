<template>
  <div class="app-container">
    <VerticalNavbar :cartCount="cartItems.length" />
    <div class="page-content">
      <h2>My Shopping Cart</h2>

      <!-- Cart Items -->
      <div v-if="cartItems.length > 0" class="cart-container">
        <!-- Cart Items List -->
        <div class="cart-items">
          <div 
            class="cart-item" 
            v-for="item in cartItems" 
            :key="item.id"
          >
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
                <button 
                  class="quantity-btn decrease" 
                  @click="decreaseQuantity(item.id)"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button 
                  class="quantity-btn increase" 
                  @click="increaseQuantity(item.id)"
                >
                  +
                </button>
              </div>
            </div>

            <div class="item-total">
              <span class="total-label">Total:</span>
              <span class="total-price">₹{{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>

            <div class="item-actions">
              <button 
                class="remove-btn" 
                @click="removeFromCart(item.id)"
                title="Remove item"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h3>Order Summary</h3>
            
            <div class="summary-row">
              <span>Items ({{ totalItems }}):</span>
              <span>₹{{ subtotal.toFixed(2) }}</span>
            </div>
            
            <hr class="summary-divider">
            
            <div class="summary-row total-row">
              <span>Total:</span>
              <span class="grand-total">₹{{ grandTotal.toFixed(2) }}</span>
            </div>

            <div class="checkout-actions">
              <button class="continue-shopping-btn" @click="continueShopping">
                Continue Shopping
              </button>
              <button class="checkout-btn" @click="proceedToCheckout">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart State -->
      <div v-else class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <button class="start-shopping-btn" @click="continueShopping">
          Start Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalNavbar from '@/components/Navbar.vue';

export default {
  name: "MyCart",
  components: { VerticalNavbar },
  data() {
    return {
      cartItems: [],
      shippingRate: 5.99,
      freeShippingThreshold: 50,
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    shipping() {
      return this.subtotal >= this.freeShippingThreshold ? 0 : this.shippingRate;
    },
    grandTotal() {
      return this.subtotal + this.shipping;
    }
  },
  methods: {
    loadCart() {
      const cart = localStorage.getItem('cart');
      this.cartItems = cart ? JSON.parse(cart) : [];
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.$emit('cart-updated', this.cartItems.length);
    },
    increaseQuantity(itemId) {
      const item = this.cartItems.find(item => item.id === itemId);
      if (item) {
        item.quantity += 1;
        this.saveCart();
      }
    },
    decreaseQuantity(itemId) {
      const item = this.cartItems.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        this.saveCart();
      }
    },
    removeFromCart(itemId) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.saveCart();
      }
    },
    continueShopping() {
      this.$router.push('/purchase');
    },
    proceedToCheckout() {
      alert(`Proceeding to checkout with total: ₹${this.grandTotal.toFixed(2)}`);
      // Here you would typically navigate to a checkout page
      // this.$router.push('/checkout');
    }
  },
  mounted() {
    this.loadCart();
  },
  watch: {
    cartItems: {
      handler() {
        this.$emit('cart-updated', this.cartItems.length);
      },
      deep: true
    }
  }
};
</script>

<style src="@/assets/cart.css"></style>