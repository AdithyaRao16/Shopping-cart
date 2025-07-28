<template>
  <div class="app-container">
    <VerticalNavbar :cartCount="cartCount" />
    <div class="page-content">
      <div v-if="product" class="product-details-container">
        <nav class="breadcrumb">
          <router-link to="/purchase">← Back to Products</router-link>
        </nav>

        <div class="product-details">
          <div class="product-image-section">
            <div class="main-image">
              <img :src="product.image" :alt="product.title" />
            </div>
          </div>

          <div class="product-info-section">
            <div class="product-header">
              <h1>{{ product.title }}</h1>
              <div class="price-section">
                <span class="current-price">₹{{ product.price.toFixed(2) }}</span>
              </div>
            </div>

            <div class="product-description">
              <h3>Description</h3>
              <p>{{ product.description }}</p>
            </div>

            <div class="product-specifications">
              <h3>Specifications</h3>
              <div class="spec-grid">
                <div class="spec-item">
                  <span class="spec-label">Category:</span>
                  <span class="spec-value">{{ getCategoryDisplayName(product.category) }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Size:</span>
                  <span class="spec-value">{{ product.size }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Color:</span>
                  <span class="spec-value">{{ product.color }}</span>
                </div>
              </div>
            </div>

            <div class="quantity-section">
              <h3>Quantity</h3>
              <div class="quantity-controls">
                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <span class="quantity-display">{{ quantity }}</span>
                <button @click="increaseQuantity">+</button>
              </div>
            </div>

            <div class="action-buttons">
              <button class="add-to-cart-btn" @click="addToCart">
                Add to Cart (₹{{ (product.price * quantity).toFixed(2) }})
              </button>
              <button class="buy-now-btn" @click="buyNow">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <router-link to="/purchase" class="back-link">← Back to Products</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VerticalNavbar from '@/components/Navbar.vue';

const route = useRoute();
const router = useRouter();

const product = ref(null);
const quantity = ref(1);
const cartCount = ref(0);

const products = [
  { id: 1, title: "Men's White Shirt", price: 400, description: "Comfortable white shirt for men. Made with high-quality cotton fabric, this shirt offers excellent breathability and comfort for daily wear. Perfect for office, casual outings, or formal events.", category: "men", size: "M", color: "White", image: "/mens clothing/download (1).jpeg" },
  { id: 2, title: "Men's Green Shirt", price: 500, description: "Comfortable green shirt for men. Crafted with premium materials, this shirt provides a perfect fit and stylish appearance. Ideal for both casual and semi-formal occasions.", category: "men", size: "L", color: "Green", image: "/mens clothing/download (2).jpeg" },
  { id: 3, title: "Men's White T-Shirt", price: 800, description: "Comfortable white T-shirt for men. Made with soft cotton blend fabric, this T-shirt offers superior comfort and durability. Perfect for everyday wear and casual outings.", category: "men", size: "M", color: "White", image: "/mens clothing/download (3).jpeg" },
  { id: 4, title: "Men's Checks Shirt", price: 1500, description: "Comfortable checks shirt for men. Features a classic checkered pattern with modern tailoring. Made with premium fabric for long-lasting wear and comfort.", category: "men", size: "L", color: "Blue", image: "/mens clothing/download.jpeg" },
  { id: 14, title: "Men's Green Checks Shirt", price: 450, description: "Bright green checks shirt for men. A vibrant addition to your wardrobe with comfortable fit and stylish design. Perfect for casual and smart-casual occasions.", category: "men", size: "S", color: "Green", image: "/mens clothing/images (2).jpeg" },
  { id: 5, title: "Women's Chudidhar", price: 2500, description: "Elegant chudidhar for women. Traditional Indian wear with contemporary styling. Made with high-quality fabric and intricate designs for special occasions.", category: "women", size: "M", color: "Red", image: "/womens clothing/download (1).jpeg" },
  { id: 6, title: "Women's Modern Dress", price: 3200, description: "Elegant modern dress for women. Contemporary design with comfortable fit and premium fabric. Perfect for parties, office wear, or special events.", category: "women", size: "L", color: "Green", image: "/womens clothing/download (2).jpeg" },
  { id: 7, title: "Women's Traditional Dress", price: 4000, description: "Elegant traditional dress for women. Features classic Indian styling with modern comfort. Made with premium materials and detailed craftsmanship.", category: "women", size: "XL", color: "Blue", image: "/womens clothing/download (3).jpeg" },
  { id: 8, title: "Women's Modern White Dress", price: 6000, description: "Elegant modern white dress for women. Sophisticated design with premium fabric and excellent fit. Perfect for formal events and special occasions.", category: "women", size: "S", color: "White", image: "/womens clothing/images (6).jpeg" },
  { id: 9, title: "Women's Gown", price: 10000, description: "Elegant gown for women. Luxurious design with premium fabric and exquisite detailing. Perfect for weddings, parties, and formal events.", category: "women", size: "L", color: "Black", image: "/womens clothing/images (8).jpeg" },
  { id: 10, title: "Kids' Dark Blue Shirt", price: 200, description: "Bright dark blue shirt for kids. Comfortable and durable design perfect for active children. Made with soft, breathable fabric for all-day comfort.", category: "kids", size: "S", color: "Blue", image: "/kids clothing/download (1).jpeg" },
  { id: 11, title: "Kids' White Shirt", price: 250, description: "Bright white shirt for kids. Classic design with comfortable fit and easy-care fabric. Perfect for school, parties, or casual wear.", category: "kids", size: "M", color: "White", image: "/kids clothing/download (2).jpeg" },
  { id: 12, title: "Kids' Half Pant", price: 300, description: "Bright half pant for kids. Comfortable and practical design for active children. Made with durable fabric that's easy to wash and maintain.", category: "kids", size: "M", color: "Black", image: "/kids clothing/images (1).jpeg" },
  { id: 13, title: "Kids' Jeans Jacket and Pant", price: 600, description: "Bright jeans jacket and pant for kids. Stylish denim set with comfortable fit and durable construction. Perfect for casual outings and playtime.", category: "kids", size: "L", color: "Blue", image: "/kids clothing/images (2).jpeg" }
];

function loadProduct() {
  const productId = parseInt(route.params.id);
  product.value = products.find(p => p.id === productId) || null;
}

function loadCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cartCount.value = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCategoryDisplayName(category) {
  const categoryMap = {
    'men': "Men's Clothing",
    'women': "Women's Clothing",
    'kids': "Kids' Clothing"
  };
  return categoryMap[category] || category;
}

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === product.value.id);

  if (existingItem) {
    existingItem.quantity += quantity.value;
  } else {
    cart.push({ ...product.value, quantity: quantity.value });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartCount();
  alert(`${product.value.title} (${quantity.value}) added to cart!`);
}

function buyNow() {
  addToCart();
  router.push('/cart');
}

onMounted(() => {
  loadProduct();
  loadCartCount();
});

watch(() => route.params.id, () => {
  loadProduct();
});
</script>
<style scoped src="@/assets/ProductDetails.css"></style>

