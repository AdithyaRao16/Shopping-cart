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
          <span v-if="props.cartCount > 0" class="cart-count">{{ props.cartCount }}</span>
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

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/navbar.css';

const props = defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
});

const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const logout = () => {
  closeMenu();
  alert("Logging out...");
  router.push('/login');
};

onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});
</script>
