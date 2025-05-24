<template>
  <div class="app-container">
    <VerticalNavbar />
    <div class="page-content">
      <h2>Purchase Products</h2>

      <!-- Dropdown Filter -->
      <div class="filter-section">
        <div class="filter-dropdown">
          <label for="categorySelect">Filter by Category:</label>
          <select id="categorySelect" v-model="filter">
            <option value="all">All Categories</option>
            <option value="men">Men's Clothing</option>
            <option value="women">Women's Clothing</option>
            <option value="kids">Kids' Clothing</option>
          </select>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid">
        <div
          class="product-card"
          v-for="dress in filteredDresses"
          :key="dress.id"
        >
          <img :src="dress.image" :alt="dress.title" />
          <h3>{{ dress.title }}</h3>
          <p class="price">₹{{ dress.price.toFixed(2) }}</p>
          <p class="description">{{ dress.description }}</p>
          <button class="add-to-cart-btn" @click="addToCart(dress)">Add to Cart</button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredDresses.length === 0" class="empty-state">
        <h3>No products found</h3>
        <p>Try selecting a different category filter.</p>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalNavbar from '@/components/Navbar.vue';

export default {
  name: "Purchase",
  components: { VerticalNavbar },
  data() {
    return {
      filter: 'all',
      dresses: [
        {
          id: 1,
          title: "Men's White Shirt",
          price: 400,
          description: "Comfortable white shirt for men.",
          category: "men",
          image: "/mens clothing/download (1).jpeg",
        },
        {
          id: 2,
          title: "Men's green Shirt",
          price: 500,
          description: "Comfortable green shirt for men.",
          category: "men",
          image: "/mens clothing/download (2).jpeg",
        },
        {
          id: 3,
          title: "Men's White T-Shirt",
          price: 800,
          description: "Comfortable white T-shirt for men.",
          category: "men",
          image: "/mens clothing/download (3).jpeg",
        },
        {
          id: 4,
          title: "Men's checks Shirt",
          price: 1500,
          description: "Comfortable checks shirt for men.",
          category: "men",
          image: "/mens clothing/download.jpeg",
        },
        {
          id: 5,
          title: "Women's chudidhar",
          price: 2500,
          description: "Elegant chudidhar for women.",
          category: "women",
          image: "/womens clothing/download (1).jpeg",
        },
        {
          id: 6,
          title: "Women's modern Dress",
          price: 3200,
          description: "Elegant modern for women.",
          category: "women",
          image: "/womens clothing/download (2).jpeg",
        },
        {
          id: 7,
          title: "Women's traditional Dress",
          price: 4000,
          description: "Elegant traditional dress for women.",
          category: "women",
          image: "/womens clothing/download (3).jpeg",
        },
        {
          id: 8,
          title: "Women's modern white Dress",
          price: 6000,
          description: "Elegant modern white dress for women.",
          category: "women",
          image: "/womens clothing/images (6).jpeg",
        },
        {
          id: 9,
          title: "Women's gown",
          price: 10000,
          description: "Elegant gown for women.",
          category: "women",
          image: "/womens clothing/images (8).jpeg",
        },
        {
          id: 10,
          title: "Kids' dark blue shirt",
          price: 200,
          description: "Bright dark blue shirt for kids.",
          category: "kids",
          image: "/kids clothing/download (1).jpeg",
        },
        {
          id: 11,
          title: "Kids' white shirt",
          price: 250,
          description: "Bright white shirt for kids.",
          category: "kids",
          image: "/kids clothing/download (2).jpeg",
        },
        {
          id: 12,
          title: "Kids' half pant ",
          price: 300,
          description: "Bright half pant for kids.",
          category: "kids",
          image: "/kids clothing/images (1).jpeg",
        },
        {
          id: 13,
          title: "Kids' jeans jacket and pant",
          price: 600,
          description: "Bright jeans jacket and pant for kids.",
          category: "kids",
          image: "/kids clothing/images (2).jpeg",
        },
        
        
      ],
      cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    };
  },
  computed: {
    filteredDresses() {
      if (this.filter === 'all') return this.dresses;
      return this.dresses.filter(d => d.category === this.filter);
    },
  },
  methods: {
    addToCart(dress) {
      const existingItem = this.cart.find(item => item.id === dress.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...dress, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.$emit('cart-updated', this.cart.length);
      alert(`${dress.title} added to cart!`);
    },
  },
  mounted() {
    this.$emit('cart-updated', this.cart.length);
  }
};
</script>

<style src="@/assets/purchase.css"></style>