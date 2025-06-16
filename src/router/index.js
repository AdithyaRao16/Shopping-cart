import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Purchase from '@/components/Purchase.vue';
import Cart from '@/components/cart.vue';
import Profile from '@/components/Profile.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
   { path: '/purchase', name: 'Purchase', component: Purchase },
   { path: '/cart', name: 'Cart', component: Cart },
    { path: '/profile', name: 'Profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


export default router;
