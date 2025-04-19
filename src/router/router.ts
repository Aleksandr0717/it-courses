import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const checkAuth = (): boolean | object => {
  if (!localStorage.getItem("currentUser") && !sessionStorage.getItem("currentUser")) {
    alert('Вы не прошли авторизацию')
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
