<script setup lang="ts">
import type { ICourseInfo } from '@/interfaces';
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
import { useCoursesStore } from '@/stores/CoursesStore';
import CourseTitleCard from '@/components/UI/CourseTitleCard.vue'
import PageLoader from '@/components/UI/PageLoader.vue';
import CourseTitleHeader from '@/components/UI/CourseTitleHeader.vue';


document.title = 'Список курсов';
const coursesStore = useCoursesStore();
const listOfPythonCourses = ref<ICourseInfo[]>([]);
const listOfJSCourses = ref<ICourseInfo[]>([]);
const listOfCsharpCourses = ref<ICourseInfo[]>([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  listOfPythonCourses.value = await coursesStore.GET_COURSES_TITLE('python');
  listOfJSCourses.value = await coursesStore.GET_COURSES_TITLE('js');
  listOfCsharpCourses.value = await coursesStore.GET_COURSES_TITLE('csharp');
  isLoading.value = false;
})

const selectedDifficultyLevel = ref<string[]>(['4']);
const isFreeCourses = ref(false);
const searchQueryforPython = ref('');
const searchQueryforJS = ref('');
const searchQueryforCsharp = ref('');
const isEditedCourseInfo = ref(false);
const visibleFilter = ref(false);

const filterByDifficultyLevel = (list: Ref<ICourseInfo[]>): ICourseInfo[] => {
  if (selectedDifficultyLevel.value.includes('4')) {
    return list.value;
  } else {
    return list.value.filter((course: ICourseInfo) => selectedDifficultyLevel.value.includes(course.level));
  }
};
const filterByFree = (list: ComputedRef<ICourseInfo[]>): ICourseInfo[] => {
  if (isFreeCourses.value) {
    return list.value.filter((course: ICourseInfo) => course.price === 'Бесплатно');
  } else return list.value;
};
const sortByTitle = (list: ComputedRef<ICourseInfo[]>, searchQuery: Ref<string>): ICourseInfo[] => {
  return list.value.filter((course: ICourseInfo) => course.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
};

const updateCourseTitleCard = async (list: Ref<ICourseInfo[]>, course: ICourseInfo): Promise<void> => {
  await coursesStore.UPDATE_COURSE_TITLE(course);
  list.value[list.value.findIndex((item) => item.id === course.id)] = course;
  isEditedCourseInfo.value = false;
};

const deleteCourseTitleCard = async (id: number, list: Ref<ICourseInfo[]>): Promise<void> => {
  const course = list.value.find((course: ICourseInfo) => course.id === id);
  await coursesStore.DELETE_COURSE_TITLE(course);
  list.value = list.value.filter((course: ICourseInfo) => course.id !== id);
};

const filteredByDifficultPythonCoursesList = computed(() => filterByDifficultyLevel(listOfPythonCourses));
const filteredByDifficultJSCoursesList = computed(() => filterByDifficultyLevel(listOfJSCourses));
const filteredByDifficultCsharpCoursesList = computed(() =>filterByDifficultyLevel(listOfCsharpCourses));

const filteredByFreePythonCoursesList = computed(() => filterByFree(filteredByDifficultPythonCoursesList));
const filteredByFreeJSCoursesList = computed(() => filterByFree(filteredByDifficultJSCoursesList));
const filteredByFreeCsharpCoursesList = computed(() => filterByFree(filteredByDifficultCsharpCoursesList));

const sortedPythonCoursesList = computed(() => sortByTitle(filteredByFreePythonCoursesList, searchQueryforPython));
const sortedJSCoursesList = computed(() => sortByTitle(filteredByFreeJSCoursesList, searchQueryforJS));
const sortedCsharpCoursesList = computed(() => sortByTitle(filteredByFreeCsharpCoursesList, searchQueryforCsharp));

const updatePythonTitleCard = async (course: ICourseInfo): Promise<void> => {
  await updateCourseTitleCard(listOfPythonCourses, course);
};

const updateJSTitleCard = async (course: ICourseInfo): Promise<void> => {
  await updateCourseTitleCard(listOfJSCourses, course);
};

const updateCsharpTitleCard = async (course: ICourseInfo): Promise<void> => {
  await updateCourseTitleCard(listOfCsharpCourses, course);
};

const deletePythonTitleCard = async (id: number): Promise<void> => {
  await deleteCourseTitleCard(id, listOfPythonCourses);
};

const deleteJSTitleCard = async (id: number): Promise<void> => {
  await deleteCourseTitleCard(id, listOfJSCourses);
};

const deleteCsharpTitleCard = async (id: number): Promise<void> => {
  await deleteCourseTitleCard(id, listOfCsharpCourses);
};

const clickOnCource = (course: ICourseInfo): void =>{
  if(isEditedCourseInfo.value) return;
  course.action();
};
</script>

<template>
  <div class="main d-flex">
    <div class="main-filter">
      <div class="main-filter-fixed pt-4 d-flex flex-column">
        <div class="filter-header d-flex justify-center mb-3">
          <h3>Фильтры</h3>
          <v-btn
            v-if="$vuetify.display.mobile"
            variant="flat"
            size="26"
            tile
            :icon="visibleFilter ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="visibleFilter = !visibleFilter"
          >
          </v-btn>
        </div>
        <VDivider v-if="visibleFilter || !$vuetify.display.mobile"/>
        <div class="difficulty-level ml-4 mt-3 mb-2" v-if="visibleFilter || !$vuetify.display.mobile">
          <p>Уровень сложности</p>
          <div class="ml-6">
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="4"
              hide-details
              color="green"
              density="compact"
              >
              <template #label>
                <p>Все уровни</p>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="1"
              hide-details
              color="green"
              density="compact"
              >
              <template #label>
                <p>Начальный уровень</p>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="2"
              hide-details
              color="green"
              density="compact"
              >
              <template #label>
                <p>Средний уровень</p>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="selectedDifficultyLevel"
              value="3"
              hide-details
              color="green"
              density="compact"
              >
              <template #label>
                <p>Продвинутый уровень</p>
              </template>
            </v-checkbox>
          </div>
        </div>
        <VDivider v-if="visibleFilter || !$vuetify.display.mobile" />
        <div class="price ml-4 mt-3" v-if="visibleFilter || !$vuetify.display.mobile">
          <p>Цена</p>
          <div class="ml-6">
            <v-checkbox v-model="isFreeCourses" hide-details color="green" density="compact">
              <template #label>
                <p>Только бесплатные</p>
              </template>
            </v-checkbox>
          </div>
        </div>
        <VDivider v-if="visibleFilter || !$vuetify.display.mobile" />
      </div>
    </div>
    <div v-if="$route.params.lang === 'python'" class="main-content mt-4 mb-3">
      <course-title-header  v-model="searchQueryforPython">
        <template #title><h3>Курсы по Python</h3></template>
        <template #description>
          <p>
            Курсы, которые помогут вам изучить один из самых популярных языков программирования от
            базовых конструкций до разработки приложений и работы с данными. Здесь вы найдете курсы
            как для начинающих, так и для опытных программистов.
          </p>
        </template>
      </course-title-header>
      <div class="content d-flex flex-column ga-3 mt-5">
        <VDivider />
        <PageLoader v-if="isLoading" :height="450" />
        <div class="d-flex justify-center" v-else-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!sortedPythonCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <transition-group name="courses-list" v-else>
          <CourseTitleCard
            v-for="course in sortedPythonCoursesList"
            :key="course.id"
            :course="course"
            @edit-card="(value) => isEditedCourseInfo = value"
            @click="clickOnCource(course)"
            @update-info="updatePythonTitleCard"
            @delete-course="deletePythonTitleCard"
          />
        </transition-group>
      </div>
    </div>
    <div v-else-if="$route.params.lang === 'js'" class="main-content mt-4 mb-3">
      <course-title-header v-model="searchQueryforJS">
        <template #title><h3>Курсы по JavaScript</h3></template>
        <template #description>
          <p>
            JavaScript используется для создания веб-приложений, интерфейсов, мобильных приложений,
            игр, а также в серверной разработке с использованием среды Node.js.
          </p>
        </template>
      </course-title-header>
      <div class="content d-flex flex-column ga-3 mt-5">
        <VDivider />
        <PageLoader v-if="isLoading" :height="450" />
        <div class="d-flex justify-center" v-else-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!sortedJSCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <transition-group name="courses-list" v-else>
          <CourseTitleCard
            v-for="course in sortedJSCoursesList"
            :key="course.id"
            :course="course"
            @edit-card="(value) => isEditedCourseInfo = value"
            @click="clickOnCource(course)"
            @update-info="updateJSTitleCard"
            @delete-course="deleteJSTitleCard"
          />
        </transition-group>
      </div>
    </div>
    <div v-else class="main-content mt-4 mb-3">
      <course-title-header v-model="searchQueryforCsharp">
        <template #title><h3>Курсы по C#</h3></template>
        <template #description>
          <p>
            Курсы для тех, кто хочет изучить основы и продвинутые концепции программирования на C#. Вы
            освоите Unity, LINQ, .NET, бэкенд-разработку на C#, и разработку оконных приложений.
          </p>
        </template>
      </course-title-header>
      <div class="content d-flex flex-column ga-3 mt-5">
        <VDivider />
        <PageLoader v-if="isLoading" :height="450" />
        <div class="d-flex justify-center" v-else-if="!selectedDifficultyLevel.length">
          <strong>Выберите уровень сложности</strong>
        </div>
        <div class="d-flex justify-center" v-else-if="!sortedCsharpCoursesList.length">
          <strong>По выбранному уровню сложности нет бесплатных курсов</strong>
        </div>
        <transition-group name="courses-list" v-else>
          <CourseTitleCard
            v-for="course in sortedCsharpCoursesList"
            :key="course.id"
            :course="course"
            @edit-card="(value) => isEditedCourseInfo = value"
            @click="clickOnCource(course)"
            @update-info="updateCsharpTitleCard"
            @delete-course="deleteCsharpTitleCard"
          />
        </transition-group>
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

    @media (max-width: 1024px) {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid rgb(238, 238, 238);
    }

    &-fixed {
      width: 20%;
      position: fixed;
      p {
        font-size: 14px;
      }

      @media (max-width: 1024px) {
        width: 100%;
        position: relative;
      }
    }
  }

  &-content {
    width: 950px;
    padding-left: 60px;

    @media (max-width: 1024px) {
      width: 100%;
      padding-left: 30px;
    }

    @media (max-width: 768px) {
      padding-left: 20px;
      padding-right: 20px;
    }

    @media (max-width: 576px) {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  .courses-list-enter-active,
  .courses-list-leave-active {
    transition: all 0.4s ease;
  }

  .courses-list-enter-from,
  .courses-list-leave-to {
    opacity: 0;
    transform: translateX(100px);
  }
}
</style>
