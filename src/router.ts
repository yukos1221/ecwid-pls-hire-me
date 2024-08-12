import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Main', component: () => import('./pages/MainPage.vue') },
  { path: '/category/:id', component: () => import('./pages/MainPage.vue') },
  {
    path: '/item/:id',
    name: 'Item',
    component: () => import('./pages/ItemPage.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('./pages/CartPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
