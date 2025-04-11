<script setup lang="ts">
import { ref } from 'vue'
import type { IContent } from '@/interfaces'
import { useCheckRegisteredUser } from '@/use/CheckRegisteredUser'
import { useRouter } from 'vue-router'

document.title = 'Главная'
const router = useRouter()
const { unRegisteredUser } = useCheckRegisteredUser()
const contentList = ref<IContent[]>([
  {
    id: 1,
    title: 'Коротко о Python',
    description:
      'Python — это высокоуровневый язык программирования, отличающийся эффективностью, простотой и универсальностью использования. Он широко применяется в разработке веб-приложений и прикладного программного обеспечения, а также в машинном обучении и обработке больших данных. За счет простого и интуитивно понятного синтаксиса является одним из распространенных языков для обучения программированию.',
    img: '/src/assets/images/img1.jpg',
    action: () => router.push({ name: 'Courses', params: { lang: 'python'} }),
  },
  {
    id: 2,
    title: 'Коротко о JavaScript',
    description:
      'JavaScript — это интерпретируемый язык программирования, который используют для написания frontend- и backend-частей сайтов, а также мобильных приложений. Часто в текстах и обучающих материалах название языка сокращают до JS. Это язык программирования высокого уровня, то есть код на нем понятный и хорошо читается.',
    img: '/src/assets/images/img2.png',
    action: () => router.push({ name: 'Courses', params: { lang: 'js'} }),
  },
  {
    id: 3,
    title: 'Коротко о C#',
    description:
      'На сегодняшний момент язык программирования C# один из самых мощных, быстро развивающихся и востребованных языков в ИТ-отрасли. В настоящий момент на нем пишутся самые различные приложения: от небольших десктопных программок до крупных веб-порталов и веб-сервисов, обслуживающих ежедневно миллионы пользователей.',
    img: '/src/assets/images/img3.png',
    action: () => router.push({ name: 'Courses', params: { lang: 'csharp'} }),
  },
])

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
    <div class="content d-flex flex-column ga-3">
      <v-divider></v-divider>
      <div class="card" v-for="item in contentList" :key="item.id">
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
