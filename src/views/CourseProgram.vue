<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useCoursesStore } from '@/stores/CoursesStore'
import { useUserStore } from '@/stores/UserStore'
import { useRoute } from 'vue-router'
import type { ICourseProgram } from '@/interfaces'
import PageLoader from '@/components/UI/PageLoader.vue'

const courseProgram = ref<ICourseProgram | object>({})
const route = useRoute()
const coursesStore = useCoursesStore()
const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)
const isLoading = ref(false)
// const courseProgram = computed<ICourseProgram>({
//   get() {
//     const editCourseProgram: ICourseProgram = Object.assign(coursesStore.courseProgram)
//     return editCourseProgram
//   },
//   set(value) {
//     console.log(value)
//     courseProgram.value = value
//   }
// })
const signUpForCourse = async () => {
  await userStore.SIGN_UP_FOR_COURSE(currentUser.value, courseProgram.value)
}

onMounted(async () => {
  isLoading.value = true
  courseProgram.value = await coursesStore.GET_COURSE_PROGRAM(parseInt(route.hash.slice(1)))
  document.title = courseProgram.value.title
  isLoading.value = false
})

onUnmounted(() => {
  courseProgram.value = {}
})


const listForExpansionPanel = ref([
  { title: 'Общая информация о курсе', descList: ['О курсе', 'Как проходить курс', 'Для преподавателей и работы в группах', 'Достижения курса'] },
  { title: 'Ввод-вывод данных', descList: ['Введение. Знакомство с Python', 'Команды print() и input(), переменные', 'Параметры sep и end, PEP8', 'Целочисленная арифметика. Часть 1', 'Целочисленная арифметика. Часть 2'] },
  { title: 'Условный оператор', descList: ['Выбор из двух', 'Логические операции', 'Вложенные и каскадные условия'] },
  { title: 'Типы данных', descList: ['Числовые типы данных: int, float', 'Строковый тип данных', 'Модуль math'] }
])
</script>

<template>
  <div class="main d-flex flex-column align-center">
    <PageLoader v-if="isLoading" :height="800" />
    <div v-else class="header d-flex justify-center py-10">
      <div class="header-center d-flex align-center justify-start">
        <div class="back-btn mr-4">
        <VBtn variant="text" tile width="40" height="30" icon="mdi-arrow-left" @click="$router.back()" />
        </div>
        <div class="header-center-title d-flex justify-center align-start flex-column ga-4">
          <h2>{{ courseProgram.title }}</h2>
          <p>{{ courseProgram.description }}</p>
        </div>
        <VSpacer />
        <img :src="courseProgram.img" alt="Лого" height="140">
      </div>
    </div>
    <div v-if="!isLoading" class="content mt-10 d-flex justify-center">
      <div class="content-center d-flex align-start justify-space-between">
        <div class="content-center-detailed-info d-flex justify-center flex-column ga-12 px-14">
          <div v-if="courseProgram.skills" class="d-flex ga-3 flex-column">
            <h3>Вы научитесь:</h3>
            <ul>
              <li v-for="(list, i) in courseProgram.skills" :key="i">{{ list }}</li>
            </ul>
          </div>
          <div class="d-flex flex-column ga-3">
            <h3>О курсе:</h3>
            <p v-if="typeof courseProgram.about === 'object'" 
              v-for="(str, i) in courseProgram.about" :key="i"
            >
              {{ str }}
            </p>
            <p v-else>{{ courseProgram.about }}</p>
          </div>
          <div class="d-flex flex-column ga-3">
            <h3>Начальные требования:</h3>
            <p v-if="typeof courseProgram.requirements === 'object'" 
              v-for="(str, i) in courseProgram.requirements" :key="i"
            >
              {{ str }}
            </p>
            <p v-else>{{ courseProgram.requirements }}</p>
          </div>
          <div class="d-flex flex-column mb-10">
            <h3 class="mb-3">Программа курса:</h3>
            <v-expansion-panels v-for="(elem, i) in listForExpansionPanel" :key="i" variant="accordion" multiple elevation="0">
              <v-expansion-panel class="pa-0">
                <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus" class="panel-title px-2">
                  {{ elem.title }}
                </v-expansion-panel-title>
                <VDivider />
                <v-expansion-panel-text class="panel-list">
                  <ul v-for="(item, i) in elem.descList" :key="i">
                    <li>{{ item }}</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <div class="content-center-general-info d-flex flex-column">
          <div class="mb-3">
            <h4>{{ courseProgram.price }}</h4>
            <h4>{{ courseProgram.level }}</h4>
          </div>
          <div class="quantity pa-3 mb-5">
            <h4>В курс входят:</h4>
            <ul v-for="(item, i) in courseProgram.includes" :key="i">
              <li>{{ item }}</li>
            </ul>
          </div>
          <v-btn 
          v-if="courseProgram.price === 'Бесплатно'" 
          class="btn text-none" 
          flat 
          color="green" 
          width="200"
          @click="signUpForCourse"
          >
            Записаться на курс
          </v-btn>
          <v-btn v-else class="btn text-none" flat color="blue" width="200" @click="signUpForCourse">Оплатить курс</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

$bg-color: rgb(233, 233, 233);
.main {
  width: 100%;
  .header {
    width: 100%;
    height: auto;
    background-color: $bg-color;
    &-center {
      width: 1030px;
      &-title {
        padding-right: 100px;
      }
    }
  }
  .content {
    width: 100%;
    &-center {
      width: 1030px;
      &-detailed-info {
        ul {
          list-style: none;
          li::before {
            content: "✓";
            margin-right: 10px;
            color: green;
          }
        }
        .panel-title {
          font-size: 16px;
        }
        .panel-list {
          ul {
            list-style: none;
            li::before {
              content: "\203A";
              margin-right: 10px;
              color: black;
            }
          }
        }
      }
      &-general-info {
        width: 200px;
        position: sticky;
        top: 70px;
        .quantity {
          background-color: $bg-color;
          ul {
            list-style: none;
            li::before {
              content: "\203A";
              margin-right: 10px;
            }
          }
        }  
      }
    }
  }

}
</style>
