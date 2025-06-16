<template>
  <div class="app-container">
    <VerticalNavbar />
    <div class="page-content">
      <h2>Purchase Products</h2>

      <!-- Dropdown Filters -->
      <div class="filter-section">
        <div class="filter-dropdown">
          <label for="categorySelect">Filter by Category:</label>
          <select id="categorySelect" v-model="filter.category">
            <option value="all">All Categories</option>
            <option value="men">Men's Clothing</option>
            <option value="women">Women's Clothing</option>
            <option value="kids">Kids' Clothing</option>
          </select>
        </div>

        <div class="filter-dropdown">
          <label for="sizeSelect">Filter by Size:</label>
          <select id="sizeSelect" v-model="filter.size">
            <option value="all">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div class="filter-dropdown">
          <label for="colorSelect">Filter by Color:</label>
          <select id="colorSelect" v-model="filter.color">
            <option value="all">All Colors</option>
            <option value="White">White</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
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
          <p><strong>Size:</strong> {{ dress.size }} | <strong>Color:</strong> {{ dress.color }}</p>
          <button class="add-to-cart-btn" @click="addToCart(dress)">Add to Cart</button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredDresses.length === 0" class="empty-state">
        <h3>No products found</h3>
        <p>Try selecting a different filter.</p>
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
      filter: {
        category: 'all',
        size: 'all',
        color: 'all'
      },
      dresses: [
        {
          id: 1,
          title: "Men's White Shirt",
          price: 400,
          description: "Comfortable white shirt for men.",
          category: "men",
          size: "M",
          color: "White",
          image: "/mens clothing/download (1).jpeg"
        },
        {
          id: 2,
          title: "Men's Green Shirt",
          price: 500,
          description: "Comfortable green shirt for men.",
          category: "men",
          size: "L",
          color: "Green",
          image: "/mens clothing/download (2).jpeg"
        },
        {
          id: 3,
          title: "Men's White T-Shirt",
          price: 800,
          description: "Comfortable white T-shirt for men.",
          category: "men",
          size: "M",
          color: "White",
          image: "/mens clothing/download (3).jpeg"
        },
        {
          id: 4,
          title: "Men's Checks Shirt",
          price: 1500,
          description: "Comfortable checks shirt for men.",
          category: "men",
          size: "L",
          color: "Blue",
          image: "/mens clothing/download.jpeg"
        },
        {
          id: 14,
          title: "Men's Green Checks Shirt",
          price: 450,
          description: "Bright green checks shirt for men.",
          category: "men",
          size: "S",
          color: "Green",
          image: "/mens clothing/images (2).jpeg"
        },
        {
          id: 5,
          title: "Women's Chudidhar",
          price: 2500,
          description: "Elegant chudidhar for women.",
          category: "women",
          size: "M",
          color: "Red",
          image: "/womens clothing/download (1).jpeg"
        },
        {
          id: 6,
          title: "Women's Modern Dress",
          price: 3200,
          description: "Elegant modern dress for women.",
          category: "women",
          size: "L",
          color: "Green",
          image: "/womens clothing/download (2).jpeg"
        },
        {
          id: 7,
          title: "Women's Traditional Dress",
          price: 4000,
          description: "Elegant traditional dress for women.",
          category: "women",
          size: "XL",
          color: "Blue",
          image: "/womens clothing/download (3).jpeg"
        },
        {
          id: 8,
          title: "Women's Modern White Dress",
          price: 6000,
          description: "Elegant modern white dress for women.",
          category: "women",
          size: "S",
          color: "White",
          image: "/womens clothing/images (6).jpeg"
        },
        {
          id: 9,
          title: "Women's Gown",
          price: 10000,
          description: "Elegant gown for women.",
          category: "women",
          size: "L",
          color: "Black",
          image: "/womens clothing/images (8).jpeg"
        },
        {
          id: 10,
          title: "Kids' Dark Blue Shirt",
          price: 200,
          description: "Bright dark blue shirt for kids.",
          category: "kids",
          size: "S",
          color: "Blue",
          image: "/kids clothing/download (1).jpeg"
        },
        {
          id: 11,
          title: "Kids' White Shirt",
          price: 250,
          description: "Bright white shirt for kids.",
          category: "kids",
          size: "M",
          color: "White",
          image: "/kids clothing/download (2).jpeg"
        },
        {
          id: 12,
          title: "Kids' Half Pant",
          price: 300,
          description: "Bright half pant for kids.",
          category: "kids",
          size: "M",
          color: "Black",
          image: "/kids clothing/images (1).jpeg"
        },
        {
          id: 13,
          title: "Kids' Jeans Jacket and Pant",
          price: 600,
          description: "Bright jeans jacket and pant for kids.",
          category: "kids",
          size: "L",
          color: "Blue",
          image: "/kids clothing/images (2).jpeg"
        }
      ],
      cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    };
  },
  computed: {
    filteredDresses() {
      return this.dresses.filter(dress => {
        const categoryMatch = this.filter.category === 'all' || dress.category === this.filter.category;
        const sizeMatch = this.filter.size === 'all' || dress.size === this.filter.size;
        const colorMatch = this.filter.color === 'all' || dress.color.toLowerCase() === this.filter.color.toLowerCase();
        return categoryMatch && sizeMatch && colorMatch;
      });
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
