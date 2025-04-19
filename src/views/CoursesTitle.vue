<script setup lang="ts">
import type { ICourseInfo } from '@/interfaces'
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import { useCoursesStore } from '@/stores/CoursesStore';
import CourseTitleCard from '@/components/UI/CourseTitleCard.vue'
import PageLoader from '@/components/UI/PageLoader.vue';

document.title = 'Список курсов'
const coursesStore = useCoursesStore();

const listOfPythonCourses = ref<ICourseInfo[]>([])
const listOfJSCourses = ref<ICourseInfo[]>([])
const listOfCsharpCourses = ref<ICourseInfo[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  listOfPythonCourses.value = await coursesStore.GET_COURSES_TITLE('python')
  listOfJSCourses.value = await coursesStore.GET_COURSES_TITLE('js')
  listOfCsharpCourses.value = await coursesStore.GET_COURSES_TITLE('csharp')
  isLoading.value = false
})

const selectedDifficultyLevel = ref<number[]>([4])
const isFreeCourses = ref(false)

const filterByDifficultyLevel = (list: Ref): ICourseInfo[] => {
  if (selectedDifficultyLevel.value.includes(4)) {
    return list.value
  } else {
    return list.value.filter((course: ICourseInfo) =>
      selectedDifficultyLevel.value.includes(course.level),
    )
  }
}
const filteredByFree = (list: ComputedRef<ICourseInfo[]>): ICourseInfo[] => {
  if (isFreeCourses.value) {
    return list.value.filter((course: ICourseInfo) => course.price === 'Бесплатно')
  } else return list.value
}

const filteredByDifficultPythonCoursesList = computed(() => filterByDifficultyLevel(listOfPythonCourses))
const filteredByDifficultJSCoursesList = computed(() => filterByDifficultyLevel(listOfJSCourses))
const filteredByDifficultCsharpCoursesList = computed(() =>filterByDifficultyLevel(listOfCsharpCourses))

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
              :value="4"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Все уровни</p>
              </template></v-checkbox
            >
            <v-checkbox
              v-model="selectedDifficultyLevel"
              :value="1"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Начальный уровень</p>
              </template></v-checkbox
            >
            <v-checkbox
              v-model="selectedDifficultyLevel"
              :value="2"
              hide-details
              color="green"
              density="compact"
              ><template #label>
                <p>Средний уровень</p>
              </template></v-checkbox
            >
            <v-checkbox
              v-model="selectedDifficultyLevel"
              :value="3"
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
            <v-checkbox v-model="isFreeCourses" hide-details color="green" density="compact"
              ><template #label>
                <p>Только бесплатные</p>
              </template></v-checkbox
            >
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
        <PageLoader v-if="isLoading" :height="500" />
        <div class="d-flex justify-center" v-else-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!filteredByFreePythonCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <CourseTitleCard
          v-else
          v-for="course in filteredByFreePythonCoursesList"
          :key="course.id"
          :course="course"
          @click="course.action"
        />
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
        <PageLoader v-if="isLoading" :height="500" />
        <div class="d-flex justify-center" v-else-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!filteredByFreeJSCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <CourseTitleCard
          v-else
          v-for="course in filteredByFreeJSCoursesList"
          :key="course.id"
          :course="course"
          @click="course.action"
        />
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
        <PageLoader v-if="isLoading" :height="500" />
        <div class="d-flex justify-center" v-else-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!filteredByFreeCsharpCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <CourseTitleCard
          v-else
          v-for="course in filteredByFreeCsharpCoursesList"
          :key="course.id"
          :course="course"
          @click="course.action"
        />
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
  &-content {
    width:950px;
    padding-left: 60px;
  }
}
</style>
