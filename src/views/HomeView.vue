<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ICourseType } from '@/interfaces'
import { useCheckRegisteredUser } from '@/use/CheckRegisteredUser'
import { useCoursesStore } from '@/stores/CoursesStore';
import PageLoader from '@/components/UI/PageLoader.vue';

document.title = 'Главная'
const coursesStore = useCoursesStore()
const { unRegisteredUser } = useCheckRegisteredUser()
const coursesTypesList = ref<ICourseType[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  coursesTypesList.value = await coursesStore.GET_COURSES_TYPE()
  isLoading.value = false
})
</script>

<template>
  <div class="main-content d-flex justify-center">
    <div class="main-content-center d-flex flex-column">
      <div class="header d-flex flex-column align-center justify-center">
        <div class="header-logo d-flex align-center justify-center">
          <h1>Курсы и тесты по программированию</h1>
        </div>
        <p>
          Фронтенд и бэкенд, мобильная разработка и создание игр, популярные языки — выбирайте, что
          нравится, практикуйтесь на реальных бизнес-задачах.
        </p>
        <p style="color: blue">
          Доступ к курсам предоставляется только авторизованным пользователям!
        </p>
      </div>
      <PageLoader v-if="isLoading" :height="500" />
      <div v-else class="content d-flex flex-column ga-3">
        <v-divider></v-divider>
        <div class="card" v-for="item in coursesTypesList" :key="item.id">
          <div class="desc-cards d-flex ga-6 mb-4">
            <img :src="item.img" alt="Логотип" height="170" />
            <div class="desc-card-text d-flex flex-column ga-3">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <v-btn v-if="!unRegisteredUser" class="btn text-none" width="200" color="green" flat @click="item.action"
                >Перейти к курсам</v-btn>
            </div>
          </div>
          <v-divider></v-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  .main-content-center {
    padding-inline: 30px;
    width: 1450px;
    .header {
      height: 150px;
      .header-logo {
        height: 70px;
        h1 {
          font-size: 40px;
        }
      }
      p {
        font-size: 18px;
      }
    }
    .content {
      .btn {
        letter-spacing: 0;
        font-size: 16px;
      }
    }
  }
}
</style>
