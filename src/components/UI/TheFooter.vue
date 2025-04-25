<script setup lang="ts">
import type { INavLink } from '@/interfaces';

const listOfLinks: INavLink[] = [
  { id: 1, title: 'Главная', to: { name: 'Home' } },
  { id: 2, title: 'Курсы по Python', to: { name: 'Courses', params: { lang: 'python' }} },
  { id: 3, title: 'Курсы по JavaScript', to: { name: 'Courses', params: { lang: 'js' }} },
  { id: 4, title: 'Курсы по C#', to: { name: 'Courses', params: { lang: 'csharp' }} },
]
</script>

<template>
  <div class="footer d-flex">
    <div class="privacy d-flex align-center justify-center">
      <p>Copyright © 2025 EasyCode. All right reserved.</p>
    </div>
    <div class="nav-links d-flex align-center justify-center">
      <router-link 
      v-for="link in listOfLinks" 
      :key="link.id" 
      class="nav-link" 
      :to="link.to"
      active-class="nav-link-active"
      >
        {{ link.title }}
      </router-link>
    </div>
    <div class="social d-flex flex-column align-center justify-center ga-2">
      <p>Мы в соцсетях</p>
      <div class="d-inline">
        <a href="http://vk.com"><img class="media-icons" src="/src/assets/images/ВК.png" alt="ВК"></img></a>
        <a href="http://web.telegram.org"><img class="media-icons" src="/src/assets/images/ТГ.png" alt="ТГ"></a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$links-color: rgb(0, 162, 255);

.footer {
  background-color: rgb(34, 34, 34);
  width: 100%;
  height: 100px;
  color: white;
  font-size: 14px;
  .privacy {
    width: 33%;
  }
  .nav-links {
    width: 33%;
    .nav-link {
      color: white;
      text-decoration: none;
      margin-inline: 8px;
      &:hover {
        color: $links-color;
      }
    }
    .nav-link-active {
      color: $links-color;
    }
  }
  .social {
    width: 33%;
    .media-icons {
      width: 40px;
      margin-inline: 10px;
      transition: 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>