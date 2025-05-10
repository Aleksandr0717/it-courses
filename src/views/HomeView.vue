<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ICourseType } from '@/interfaces';
import { useCheckRegisteredUser } from '@/use/CheckRegisteredUser';
import { useCoursesStore } from '@/stores/CoursesStore';
import PageLoader from '@/components/UI/PageLoader.vue';

document.title = 'Главная';
const coursesStore = useCoursesStore();
const { unRegisteredUser } = useCheckRegisteredUser();
const coursesTypesList = ref<ICourseType[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  coursesTypesList.value = await coursesStore.GET_COURSES_TYPE();
  isLoading.value = false;
});
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
        <p v-if="unRegisteredUser" style="color: blue">
          Доступ к курсам предоставляется только авторизованным пользователям!
        </p>
      </div>
      <PageLoader v-if="isLoading" :height="500" />
      <div v-else class="content d-flex flex-column ga-3">
        <VDivider />
        <div class="card" v-for="item in coursesTypesList" :key="item.id">
          <div class="desc-cards d-flex ga-lg-6 ga-md-5 ga-sm-4 mb-4">
            <img :src="item.img" alt="Логотип" height="170" />
            <div class="desc-card-text d-flex flex-column ga-3">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <v-btn v-if="!unRegisteredUser" class="btn text-none" width="200" color="green" flat @click="item.action"
                >Перейти к курсам</v-btn>
            </div>
          </div>
          <VDivider />
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
    @media (max-width: 768px) {
      padding-inline: 15px;
    }
    .header {
      height: 150px;
      @media (max-width: 768px) {
        height: auto;
        padding: 20px 0;
        text-align: center;
      }
      .header-logo {
        height: 70px;
        h1 {
          font-size: 40px;
          @media (max-width: 768px) {
            font-size: 28px;
          }
          @media (max-width: 480px) {
            font-size: 24px;
            padding-bottom: 15px;
          }
        }
      }
      p {
        font-size: 18px;
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
    }
    .content {
      .desc-cards {
        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .btn {
          @media (max-width: 768px) {
            align-self: center;
          }
        }
      }
    }
  }
}
</style>