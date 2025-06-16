<template>
  <!-- Hamburger Menu Button -->
  <button class="hamburger-menu" :class="{ active: isOpen }" @click="toggleMenu">
    <div class="hamburger-icon">
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </div>
  </button>

  <!-- Overlay -->
  <div class="overlay" :class="{ show: isOpen }" @click="closeMenu"></div>

  <!-- Vertical Navbar -->
  <nav class="vertical-navbar" :class="{ show: isOpen }">
    <ul>
      <li>
        <router-link to="/" @click="closeMenu">
          <span class="nav-icon">🏠</span>
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/profile" @click="closeMenu">
          <span class="nav-icon">🛍️</span>
          Profile
        </router-link>
      </li>
      <li>
        <router-link to="/purchase" @click="closeMenu">
          <span class="nav-icon">🛍️</span>
          Purchase
        </router-link>
      </li>
      <li>
        <router-link to="/cart" @click="closeMenu">
          <span class="nav-icon">🛒</span>
          My Cart
          <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
        </router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">
          <span class="nav-icon">🚪</span>
          Logout
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import '@/assets/navbar.css'

export default {
  name: "VerticalNavbar",
  props: {
    cartCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    closeMenu() {
      this.isOpen = false;
    },
    logout() {
      this.closeMenu();
      alert("Logging out...");
      this.$router.push('/login');
    },
  },
  mounted() {
    // Close menu when clicking outside or pressing escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
  }
};
</script>