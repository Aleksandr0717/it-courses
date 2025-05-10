<script setup lang="ts">
import { useUserStore } from './stores/UserStore';
import { useCoursesStore } from './stores/CoursesStore';
import { computed } from 'vue';
import TheNavbar from './components/UI/TheNavbar.vue';
import TheFooter from './components/UI/TheFooter.vue';
import PageAlert from './components/UI/PageAlert.vue';

const userStore = useUserStore();
const coursesStore = useCoursesStore();
const alertMessageUser = computed(() => userStore.alertMessage);
const alertMessageCourses = computed(() => coursesStore.alertMessage);
</script>

<template>
  <v-app>
    <TheNavbar />
    <v-main>
      <Transition name="alert">
        <PageAlert v-if="alertMessageUser" :alert-info="alertMessageUser"/>
      </Transition>
      <Transition name="alert">
        <PageAlert v-if="alertMessageCourses" :alert-info="alertMessageCourses"/>
      </Transition>
      <RouterView />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<style lang="scss"></style>
