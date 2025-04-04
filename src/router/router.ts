import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const checkAuth = (): boolean | object => {
  if (!localStorage.getItem("currentUser") && !sessionStorage.getItem("currentUser")) return { name: 'Home' };
  return true;
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/settings/:userData',
    name: 'Settings',
    component: () => import('@/views/ProfileSettings.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/settings',
    redirect: { name: 'Settings', params: { userData: 'personal' } },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
