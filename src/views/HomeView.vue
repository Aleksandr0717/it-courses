<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { ICourseType } from '@/interfaces'
import { useCheckRegisteredUser } from '@/use/CheckRegisteredUser'
import { useRouter } from 'vue-router'

document.title = 'Главная'
const courseService: any = inject('courseService')
const router = useRouter()
const { unRegisteredUser } = useCheckRegisteredUser()
const coursesTypesList = ref<ICourseType[]>([])
const isLoading = ref(false)

onMounted( async () => {
  isLoading.value = true
  try {
    const response = await courseService.getCoursesType();
    coursesTypesList.value = response.map((item: ICourseType) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      img: item.img,
      action: () => router.push({ name: 'Courses', params: { lang: item.to } }),
    }));
  } catch (error) {
    console.error('Ошибка при получении данных: ', error);
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="main-content">
    <div class="header d-flex flex-column text-center">
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
    <div class="d-flex justify-center align-center" style="height: 500px;" v-if="isLoading">
      <v-progress-circular
        :size="50"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </div>
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
</template>

<style scoped lang="scss">
.main-content {
  padding: {
    left: 200px;
    right: 200px;
  }
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
    height: auto;
    .btn {
      letter-spacing: 0;
      font-size: 16px;
    }
  }
}
</style>
