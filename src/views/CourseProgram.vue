<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCoursesStore } from '@/stores/CoursesStore';
import { useUserStore } from '@/stores/UserStore';
import { useRoute } from 'vue-router';
import type { ICourseProgram, IProgramDesc } from '@/interfaces';
import { findTitle } from '@/enums';
import PageLoader from '@/components/UI/PageLoader.vue';

const courseProgram = ref<ICourseProgram | null>(null);
const listOfProgramDesc = ref<IProgramDesc[]>([]);
const route = useRoute();
const coursesStore = useCoursesStore();
const userStore = useUserStore();
const currentUser = computed(() => userStore.currentUser);
const isLoading = ref(false);
const isUserSignedUp = computed(() => userStore.currentUser?.courses.includes(courseProgram.value!?.customId));

const signUpForCourse = async () => {
  await userStore.SIGN_UP_FOR_COURSE(currentUser.value!, courseProgram.value!);
};

onMounted(async () => {
  isLoading.value = true;
  courseProgram.value = await coursesStore.GET_COURSE_PROGRAM(parseInt(route.hash.slice(1)));
  listOfProgramDesc.value = courseProgram.value!.program?.map((str: string) => {
    const splitArr = str.split(':')
    return { title: splitArr[0], desc: splitArr[1].split(';') }
  });
  document.title = courseProgram.value!.title;
  isLoading.value = false;
});
</script>

<template>
  <div class="main d-flex flex-column align-center">
    <PageLoader v-if="isLoading" :height="800" />
    <div v-else class="header d-flex justify-center py-10">
      <div class="header-center d-flex align-center justify-start">
        <div class="back-btn mr-4">
        <VBtn variant="text" tile width="40" height="30" icon="mdi-arrow-left" @click="$router.back()" />
        </div>
        <div class="header-center-title d-flex justify-center align-lg-start flex-column ga-4">
          <h2>{{ courseProgram?.title }}</h2>
          <p>{{ courseProgram?.description }}</p>
        </div>
        <VSpacer />
        <img :src="courseProgram?.img" alt="Лого" height="140">
      </div>
    </div>
    <div v-if="!isLoading" class="content mt-10 d-flex justify-center">
      <div class="content-center d-flex align-start justify-space-between">
        <div class="content-center-detailed-info d-flex justify-center flex-column ga-12 px-14 mb-10">
          <div v-if="courseProgram?.skills" class="d-flex ga-3 flex-column">
            <h3>Вы научитесь:</h3>
            <ul>
              <li v-for="(list, i) in courseProgram.skills" :key="i">{{ list }}</li>
            </ul>
          </div>
          <div class="d-flex flex-column ga-3">
            <h3>О курсе:</h3>
            <p v-if="typeof courseProgram?.about === 'object'"
              v-for="(str, i) in courseProgram.about" :key="i"
            >
              {{ str }}
            </p>
            <p v-else>{{ courseProgram?.about }}</p>
          </div>
          <div class="d-flex flex-column ga-3">
            <h3>Начальные требования:</h3>
            <p v-if="typeof courseProgram?.requirements === 'object'"
              v-for="(str, i) in courseProgram.requirements" :key="i"
            >
              {{ str }}
            </p>
            <p v-else>{{ courseProgram?.requirements }}</p>
          </div>
          <div v-if="listOfProgramDesc?.length" class="d-flex flex-column">
            <h3 class="mb-3">Программа курса:</h3>
            <v-expansion-panels v-for="(elem, i) in listOfProgramDesc" :key="i" variant="accordion" multiple elevation="0">
              <v-expansion-panel >
                <v-expansion-panel-title collapse-icon="mdi-minus" expand-icon="mdi-plus" class="panel-title px-1">
                  {{ elem.title }}
                </v-expansion-panel-title>
                <VDivider />
                <v-expansion-panel-text class="panel-list">
                  <ul v-for="(item, i) in elem.desc" :key="i">
                    <li>{{ item }}</li>
                  </ul>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <div class="content-center-general-info d-flex flex-column pr-4">
          <div class="mb-3">
            <h4>{{ courseProgram?.price }}</h4>
            <h4>{{ findTitle(courseProgram?.level) }}</h4>
          </div>
          <div class="quantity pa-3 mb-5">
            <h4>В курс входят:</h4>
            <ul v-for="(item, i) in courseProgram?.includes" :key="i">
              <li>{{ item }}</li>
            </ul>
          </div>
          <div v-if="!isUserSignedUp">
            <v-btn
              v-if="courseProgram?.price === 'Бесплатно'"
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
          <div v-else>
            <v-btn class="btn text-none" flat color="green" width="200" disabled>Вы уже записаны</v-btn>
          </div>
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

    @media (max-width: 768px) {
      padding-block: 10px !important;
    }

    &-center {
      width: 1030px;
      &-title {
        padding-right: 100px;
      }

      @media (max-width: 1200px) {
        width: 90%;
      }

      @media (max-width: 768px) {
        flex-direction: column;
        &-title {
          padding-right: 0;
          text-align: center;
          margin-bottom: 20px;
        }
      }
      img {
        @media (max-width: 768px) {
          height: 100px;
        }
      }
    }
  }
  .back-btn {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .content {
    width: 100%;
    &-center {
      width: 1030px;

      @media (max-width: 768px) {
        width: 90%;
      }

      @media (max-width: 768px) {
        flex-direction: column;
      }

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

        @media (max-width: 768px) {
          width: 100%;
          padding-inline: 10px !important;
          margin-bottom: 10px !important;
          gap: 20px !important;
        }
      }
      &-general-info {
        position: sticky;
        top: 70px;
        width: 200px;
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

        @media (max-width: 768px) {
          position: static;
          margin-block: 10px !important;
          align-self: center !important;
          padding-inline: 10px !important;
          width: 100%;
          .btn {
            width: 100% !important;
          }
        }
      }
    }
  }
}
</style>
