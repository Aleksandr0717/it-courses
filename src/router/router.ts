import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/UserStore';
import { computed } from 'vue';

const checkAuth = (): boolean | object => {
  const userStore = useUserStore();
  const alertMessage = computed({
    get: () => userStore.alertMessage,
    set: (value) => userStore.alertMessage = value
  });
  
  if (!localStorage.getItem("currentUser") && !sessionStorage.getItem("currentUser")) {
    alertMessage.value = { type: 'warning', message: 'Вы не прошли авторизацию'};
    setTimeout(() => {
      alertMessage.value = null;
    }, 3000);
    return { name: 'Home' };
  }
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
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/UserProfile.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/courses/:lang',
    name: 'Courses',
    component: () => import('@/views/CoursesTitle.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/courses',
    redirect: { name: 'Courses', params: { lang: 'python' } },
  },
  {
    path: '/courses/:lang/:id',
    name: 'Course',
    component: () => import('@/views/CourseProgram.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes,
});
