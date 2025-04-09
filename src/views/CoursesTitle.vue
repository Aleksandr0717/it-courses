<script setup lang="ts">
import type { ICourseInfo } from '@/interfaces'
import { computed, ref, type ComputedRef, type Ref } from 'vue'

const listOfPythonCourses = ref<ICourseInfo[]>([
  {
    id: 1,
    title: '"Поколение Python": курс для начинающих',
    authors: 'Тимур Гуев, Поколение Python',
    img: 'https://cdn.stepik.net/media/cache/images/courses/58852/cover_ZP5DuRM/4951fdb332a542d0a2fe70692976e557.png',
    description:
      'В курсе рассказывается об основных типах данных, конструкциях и принципах структурного программирования языка Python. Курс содержит теорию в формате текстовых конспектов и более 500 задач с автоматизированной проверкой. Этот курс является первой частью линейки курсов "Поколение Python".',
    price: 'Бесплатно',
    priceColor: 'green',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 2,
    title: '"Поколение Python": ООП',
    authors: 'Тимур Гуев, Поколение Python',
    img: 'https://cdn.stepik.net/media/cache/images/courses/98974/cover_KxjTzJX/86e38f7f6d04d35c8611e8bca49d359e.png',
    description:
      'Курс продолжает серию "Поколение Python" и рассказывает о концепции объектно-ориентированного программирования на языке Python.',
    price: '3 999 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
  {
    id: 3,
    title: '"Поколение Python": курс для профессионалов',
    authors: 'Тимур Гуев, Поколение Python',
    img: 'https://cdn.stepik.net/media/cache/images/courses/82541/cover_cdCvLlR/54db64048e1535b877d09336aa7a49de.png',
    description:
      'Курс продолжает серию "Поколение Python" и рассказывает о дополнительных возможностях языка Python, а тренировочные задачи помогают закрепить каждую тему.',
    price: '5 499 р',
    priceColor: 'red',
    level: 'Продвинутый уровень',
    levelColor: 'orange',
  },
  {
    id: 4,
    title: 'Асинхронность в Python. Asyncio',
    authors: 'Александр Шибаев',
    img: 'https://cdn.stepik.net/media/cache/images/courses/189436/cover_XMx7KNJ/36dcacaa442b4e63ff727a5f08303d48.png',
    description:
      'Асинхронное программирование на Python в теории и на практике от А до Я. Все что важно знать об асинхронном программировании и даже больше.',
    price: '2 499 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
  {
    id: 5,
    title: 'Добрый, добрый Python с Сергеем Балакиревым',
    authors: 'Сергей балакирев',
    img: 'https://cdn.stepik.net/media/cache/images/courses/100707/cover_K4JOB7c/6c361261be53b501e6ba814dcc659222.png',
    description:
      'Этот курс позволит вам изучить основы программирования на языке Python, начиная с самых азов и заканчивая довольно серьезными конструкциями. Курс рассчитан и на самых начинающих и для тех, кто уже знаком с Python, но хотел бы повысить, а заодно и проверить, свой уровень.',
    price: 'Бесплатно',
    priceColor: 'green',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 6,
    title: 'FastAPI для начинающих',
    authors: 'Илья перминов',
    img: 'https://cdn.stepik.net/media/cache/images/courses/180000/cover_3m8UXJV/101b3e0f6700d1362473dbe9cc710ab6.png',
    description:
      'Этот курс представляет собой подробное руководство по созданию приложений с помощью FastAPI. Вы начнете с приложения Hello World и далее создадите полноценное API интернет магазина, использующее асинхронные запросы к базе данных, аутентификацию и права доступа.',
    price: '1 499 р',
    priceColor: 'red',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 7,
    title: 'Добрый, добрый Django + Docker с Сергеем Балакиревым',
    authors: 'Сергей балакирев',
    img: 'https://cdn.stepik.net/media/cache/images/courses/183363/cover_BMhEh8W/334fc33eadf1e115fd032e87fad919df.jpg',
    description:
      'Этот курс позволит вам сделать первые шаги в изучении современного и популярного фреймворка Django для разработки серверной части сайта (бэкенда) на языке Python. Здесь вы шаг за шагом изучите основные компоненты фреймворка и создадите свой собственный полноценный и профессиональный сайт.',
    price: '4 299 р',
    priceColor: 'red',
    level: 'Продвинутый уровень',
    levelColor: 'orange',
  },
])

const listOfJSCourses = ref<ICourseInfo[]>([
  {
    id: 1,
    title: 'Погружение в JavaScript: для начинающих',
    authors: 'Ерсултан Сагандыков',
    img: 'https://cdn.stepik.net/media/cache/images/courses/180784/cover_5aKohoM/91e5fef7bfdfb277e6cdb73883919b4e.png',
    description:
      'Плавное и последовательное погружение в удивительный мир программирования на языке JavaScript для абсолютных новичков.',
    price: 'Бесплатно',
    priceColor: 'green',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 2,
    title: 'Фундаментальный JavaScript',
    authors: 'Михаил Непомнящий',
    img: 'https://cdn.stepik.net/media/cache/images/courses/114165/cover_vwmUs6k/6b00824491966ac2add83be8a06d9ed5.png',
    description:
      'Современный JavaScript с основ до продвинутых техник. Для начинающих и желающих закрыть пробелы и попрактиковаться. Вы изучите современный синтаксис, основы языка, работу с браузером, ООП и асинхронное программирование.',
    price: '3 499 р',
    priceColor: 'red',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 3,
    title: 'Погружение в JavaScript: для продолжающих',
    authors: 'Ерсултан Сагандыков',
    img: 'https://cdn.stepik.net/media/cache/images/courses/193152/cover_U6u0GoL/b2f2272415086cc43fc35ea5bbb36314.png',
    description:
      'Вторая часть Погружения в JavaScript, посвященная Объектно-ориентированному программированию (ООП) и не только.',
    price: '1 499 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
  {
    id: 4,
    title: 'Самый полный курс по JavaScript для начинающих программистов',
    authors: 'IT Guru',
    img: 'https://cdn.stepik.net/media/cache/images/courses/134850/cover_wDp2pWN/00c3e2106be1132d701f847ac7d501bc.jpg',
    description:
      'Этот курс идеально подходит для программистов, которые хотят изучить основы языка программирования JavaScript. В ходе курса вы узнаете основные концепции языка, включая переменные, типы данных, условные конструкции, циклы, функции и объекты.',
    price: '899 р',
    priceColor: 'red',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 5,
    title: 'Самый полный курс по JavaScript для опытных программистов',
    authors: 'IT Guru',
    img: 'https://cdn.stepik.net/media/cache/images/courses/177315/cover_9awCv0P/df7a9e68d145a0e538e83ac4d50f60d3.jpg',
    description:
      'Этот курс представляет следующий этап вашего путешествия в мире разработки приложений на JavaScript. Если вы владеете основами и стремитесь глубже освоить продвинутые концепции и методы, то этот курс именно для вас. Обширные практические задания позволят вам закрепить и применить знания на практике.',
    price: '2 999 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
  {
    id: 6,
    title: 'Полный курс по React JS (Redux / Router / Tailwind CSS)',
    authors: 'Дмитрий Фокеев',
    img: 'https://cdn.stepik.net/media/cache/images/courses/221235/cover_yHBubp5/b2a6791c7bea42ab709535c529a001dc.jpg',
    description:
      'В отличие от многих курсов, основанных на устаревших версиях React, этот курс познакомит вас с самыми современными стандартами разработки, новым синтаксисом, включая React 19 (5 декабря 2024 года), и последними обновлениями библиотек React Redux и React Router.',
    price: '3 899 р',
    priceColor: 'red',
    level: 'Продвинутый уровень',
    levelColor: 'orange',
  },
  {
    id: 7,
    title: 'Node.js с нуля, основы и построение архитектуры приложений',
    authors: 'Антон Ларичев',
    img: 'https://cdn.stepik.net/media/cache/images/courses/105538/cover_eOg483T/c1dc4b8084684831b29aa7cccb1acdbd.jpg',
    description:
      'Полный курс по написанию приложений на Node.js и построению масштабируемой и поддерживаемой архитектуры!',
    price: '2 799 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
])

const listOfCsharpCourses = ref<ICourseInfo[]>([
  {
    id: 1,
    title: 'Задачник-тренажер по основам языка программирования C#',
    authors: 'Антон Новик',
    img: 'https://cdn.stepik.net/media/cache/images/courses/177416/cover_YRQ0ih7/651aa3f727ba6e1b7bf35f2e8bbc8fe1.png',
    description:
      'Задачник включает в себя множество практических задач на языке программирования С#. Только практика, и никакой теории! Тренируйтесь в решении более 170+ задач! Курс позволит вам приобрести или улучшить практические и алгоритмические навыки в программировании на языке С#.',
    price: '599 р',
    priceColor: 'red',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 2,
    title: 'PRO C#. Основы программирования',
    authors: 'Иосиф Дзеранов, PRO C#, Факультет МИТ СОГУ',
    img: 'https://cdn.stepik.net/media/cache/images/courses/5482/cover/a3debb6072c4e93374428fd41821601c.png',
    description:
      'Курс посвящен базовым понятиям программирования: типы данных, операторы, переменные, условия, циклы, массивы и функции. Он является вводным и подойдет слушателям с небольшим опытом или вообще без опыта программирования.',
    price: 'Бесплатно',
    priceColor: 'green',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 3,
    title: 'PRO C#. Для продолжающих',
    authors: 'Иосиф Дзеранов, PRO C#',
    img: 'https://cdn.stepik.net/media/cache/images/courses/84983/cover_syIJkIp/50d0008666692a199cea540f54ca4a87.png',
    description:
      'Курс дает полное представление о том, что из себя представляет язык C#. Знания, которые есть в курсе, необходимы для работы junior C# разработчика.',
    price: '2 999 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
  {
    id: 4,
    title: 'Unity. Знакомство с движком',
    authors: 'Александр Стриков, PRO C#',
    img: 'https://cdn.stepik.net/media/cache/images/courses/126291/cover_nBGyQmf/3a805abf415390c60304620868b45877.png',
    description:
      'Не знаете, с чего начать изучение Unity и мира разработки игр? Запишитесь на наш курс «Unity. Знакомство с движком»! В доступной текстовой форме мы проведем вас от установки Unity до создания полноценного игрового прототипа. Этот курс идеально подходит для новичков и любителей игр, которые хотят понять, как устроены видеоигры изнутри.',
    price: 'Бесплатно',
    priceColor: 'green',
    level: 'Начальный уровень',
    levelColor: 'blue',
  },
  {
    id: 5,
    title: 'C#: Основа Backend-разработки на примере создания API магазина',
    authors: 'Сергей Камянецкий',
    img: 'https://cdn.stepik.net/media/cache/images/courses/212419/cover_1WXGkRq/50a191b4657c85b83ab9bce8656864ef.png',
    description:
      'В этом курсе вы шаг за шагом создадите прототип интернет-магазина, освоив ключевые аспекты веб-разработки. Вы научитесь разрабатывать слоёную архитектуру, включающую презентационный слой, бизнес-логику и слой персистенции с использованием PostgreSQL. Курс охватывает создание инфраструктуры для управления всеми аспектами онлайн магазина.',
    price: '10 499 р',
    priceColor: 'red',
    level: 'Продвинутый уровень',
    levelColor: 'orange',
  },
  {
    id: 6,
    title: 'C# MAUI | Пишем мобильное приложение "Мессенджер"',
    authors: 'Руслан Шишмарев',
    img: 'https://cdn.stepik.net/media/cache/images/courses/209583/cover_ua3XXst/a78a78b48366af32ebdee77657737f5f.png',
    description:
      'Освой разработку мобильных приложений на MAUI C# с серверной частью на ASP.NET Core. Научись создавать кросс-платформенные приложения, используя XAML, и реализуй обмен сообщениями через SignalR. Начни свой путь в мир современной мобильной разработки уже сегодня!',
    price: '4 999 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
  {
    id: 7,
    title: 'PRO C#. LINQ',
    authors: 'Иосиф Дзеранов, PRO C#',
    img: 'https://cdn.stepik.net/media/cache/images/courses/87924/cover_yxgGThK/77ea18d1ec2c048a4ae6968731ba1ff1.png',
    description:
      'Максимально полный курс об одной из наиболее часто используемых возможностей языка С#. Знания, которые есть в курсе, необходимы для работы junior C# разработчика.',
    price: '2 499 р',
    priceColor: 'red',
    level: 'Средний уровень',
    levelColor: 'yellow',
  },
])

const selectedDifficultyLevel = ref(['Все уровни'])
const isFreeCourses = ref(false)

const filterByDifficultyLevel = (list: Ref): ICourseInfo[] => {
  if (selectedDifficultyLevel.value.includes('Все уровни')) {
    return list.value
  }
  else {
    return list.value.filter((course: ICourseInfo) => selectedDifficultyLevel.value.includes(course.level))
  }
}
const filteredByFree = (list: ComputedRef<ICourseInfo[]>): ICourseInfo[] => {
  if (isFreeCourses.value) {
    return list.value.filter((course: ICourseInfo) => course.price === 'Бесплатно')
  }
  else return list.value
}

const filteredByDifficultPythonCoursesList = computed(() => filterByDifficultyLevel(listOfPythonCourses))
const filteredByDifficultJSCoursesList = computed(() => filterByDifficultyLevel(listOfJSCourses))
const filteredByDifficultCsharpCoursesList = computed(() => filterByDifficultyLevel(listOfCsharpCourses))

const filteredByFreePythonCoursesList = computed(() => filteredByFree(filteredByDifficultPythonCoursesList))
const filteredByFreeJSCoursesList = computed(() => filteredByFree(filteredByDifficultJSCoursesList))
const filteredByFreeCsharpCoursesList = computed(() => filteredByFree(filteredByDifficultCsharpCoursesList))
</script>

<template>
  <div class="main d-flex">
    <div class="main-filter">
      <div class="main-filter-fixed pt-4 d-flex flex-column">
        <div class="filter-header d-flex justify-center mb-3">
          <h3>Фильтры</h3>
        </div>
        <v-divider></v-divider>
        <div class="difficulty-level ml-4 mt-3 mb-2">
          <p>Уровень сложности</p>
          <div class="ml-6">
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="Все уровни"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Все уровни</p>
              </template></v-checkbox
            >
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="Начальный уровень"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Начальный уровень</p>
              </template></v-checkbox
            >
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="Средний уровень"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Средний уровень</p>
              </template></v-checkbox
            >
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="Продвинутый уровень"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Продвинутый уровень</p>
              </template></v-checkbox
            >
          </div>
        </div>
        <v-divider></v-divider>
        <div class="price ml-4 mt-3">
          <p>Цена</p>
          <div class="ml-6">
            <v-checkbox
              v-model="isFreeCourses"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Только бесплатные</p>
              </template></v-checkbox>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-if="$route.params.lang === 'python'" class="main-content mt-4">
      <div class="header d-flex justify-center align-center flex-column ga-4">
        <h3>Курсы по Python</h3>
        <p>
          Курсы, которые помогут вам изучить один из самых популярных языков программирования от
          базовых конструкций до разработки приложений и работы с данными. Здесь вы найдете курсы
          как для начинающих, так и для опытных программистов.
        </p>
      </div>
      <div class="content d-flex flex-column ga-3 mt-5">
        <v-divider></v-divider>
        <div class="d-flex justify-center" v-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!filteredByFreePythonCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <div v-else class="card" v-for="course in filteredByFreePythonCoursesList" :key="course.id">
          <div class="desc-card d-flex ga-6 mb-3">
            <img :src="course.img" alt="Логотип" height="110" />
            <div class="desc-card-text d-flex flex-column ga-2">
              <div class="d-flex flex-column">
                <h4 style="line-height: 1">{{ course.title }}</h4>
                <p>{{ course.authors }}</p>
              </div>
              <p>{{ course.description }}</p>
              <div class="d-flex ga-3">
                <v-chip :color="course.priceColor" size="small">{{ course.price }}</v-chip>
                <v-chip :color="course.levelColor" variant="flat" size="small">{{
                  course.level
                }}</v-chip>
              </div>
            </div>
          </div>
          <v-divider class="mb-3"></v-divider>
        </div>
      </div>
    </div>
    <div v-else-if="$route.params.lang === 'js'" class="main-content mt-4">
      <div class="header d-flex justify-center align-center flex-column ga-4">
        <h3>Курсы по JavaScript</h3>
        <p>
          JavaScript используется для создания веб-приложений, интерфейсов, мобильных приложений,
          игр, а также в серверной разработке с использованием среды Node.js.
        </p>
      </div>
      <div class="content d-flex flex-column ga-3 mt-5">
        <v-divider></v-divider>
        <div class="d-flex justify-center" v-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!filteredByFreeJSCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <div v-else class="card" v-for="course in filteredByFreeJSCoursesList" :key="course.id">
          <div class="desc-card d-flex ga-6 mb-3">
            <img :src="course.img" alt="Логотип" height="110" />
            <div class="desc-card-text d-flex flex-column ga-2">
              <div class="d-flex flex-column">
                <h4 style="line-height: 1">{{ course.title }}</h4>
                <p>{{ course.authors }}</p>
              </div>
              <p>{{ course.description }}</p>
              <div class="d-flex ga-3">
                <v-chip :color="course.priceColor" size="small">{{ course.price }}</v-chip>
                <v-chip :color="course.levelColor" variant="flat" size="small">{{
                  course.level
                }}</v-chip>
              </div>
            </div>
          </div>
          <v-divider class="mb-3"></v-divider>
        </div>
      </div>
    </div>
    <div v-else class="main-content mt-4">
      <div class="header d-flex justify-center align-center flex-column ga-4">
        <h3>Курсы по C#</h3>
        <p>
          Курсы для тех, кто хочет изучить основы и продвинутые концепции программирования на C#. Вы
          освоите Unity, LINQ, .NET, бэкенд-разработку на C#, и разработку оконных приложений.
        </p>
      </div>
      <div class="content d-flex flex-column ga-3 mt-5">
        <v-divider></v-divider>
        <div class="d-flex justify-center" v-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!filteredByFreeCsharpCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <div v-else class="card" v-for="course in filteredByFreeCsharpCoursesList" :key="course.id">
          <div class="desc-card d-flex ga-6 mb-3">
            <img :src="course.img" alt="Логотип" height="110" />
            <div class="desc-card-text d-flex flex-column ga-2">
              <div class="d-flex flex-column">
                <h4 style="line-height: 1">{{ course.title }}</h4>
                <p>{{ course.authors }}</p>
              </div>
              <p>{{ course.description }}</p>
              <div class="d-flex ga-3">
                <v-chip :color="course.priceColor" size="small">{{ course.price }}</v-chip>
                <v-chip :color="course.levelColor" variant="flat" size="small">{{
                  course.level
                }}</v-chip>
              </div>
            </div>
          </div>
          <v-divider class="mb-3"></v-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  &-filter {
    border-right: 1px solid rgb(238, 238, 238);
    width: 20%;
    height: auto;
    &-fixed {
      width: 20%;
      position: fixed;
      p {
        font-size: 14px;
      }
    }
  }
  .main-content {
    width: 70%;
    padding-left: 60px;
    padding-right: 350px;
    .card {
      cursor: pointer;
      .desc-card-text {
        p {
          font-size: 14px;
        }
        h4:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
