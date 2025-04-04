<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import RegForm from './RegForm.vue'
import { useUserStore } from '@/stores/UserStore.js'
import type { INavMenu } from '@/interfaces'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const listOfCourses = ref<INavMenu[]>([
  { id: 1, title: 'Python' },
  { id: 2, title: 'JavaScript' },
  { id: 3, title: 'C#' },
])

const profileItems = ref<INavMenu[]>([
  {
    id: 1,
    title: 'Настройки',
    icon: 'mdi-cog-outline',
    action: () => router.push({ name: 'Settings', params: { userData: 'personal' } }),
  },
  {
    id: 3,
    title: 'Выход',
    icon: 'mdi-import',
    action: () => {
      userStore.INIT_LOGOUT()
      router.push({ name: 'Home' })
    },
  },
])

const unRegisteredUser = ref(true);
const autorizationVisible = ref(false)
const currentUser = computed(() => userStore.currentUser)
const addAnimation = ref(false)
const profileMenu = ref(false)

onMounted(() => {
  const localStorageUser = localStorage.getItem("currentUser");
  if (!localStorageUser) {
    unRegisteredUser.value = true;
   
  } else {
    unRegisteredUser.value = false;
    userStore.INIT_CURRENT_USER(parseInt(JSON.parse(localStorageUser)));
  }
})

watch(currentUser, (newValue) => {
  console.log('watch currentUser ', newValue);
  if (Object.keys(newValue)?.length) unRegisteredUser.value = false;
  else {
    console.log(newValue);
    unRegisteredUser.value = true;
  }
}, {immediate: true, deep: true});
</script>

<template>
  <v-app-bar height="50" class="navbar" flat>
    <v-btn class="btn-main text-none px-0 ml-0" width="150" height="50" tile :to="{ name: 'Home' }">
      <template #prepend>
        <div class="img-bg">
          <img src="https://static.thenounproject.com/png/6135611-84.png" alt="Лого" height="30" />
        </div>
      </template>
      EasyCode</v-btn
    >
    <v-menu
      v-if="!unRegisteredUser"
      open-on-hover
      open-delay="0"
      close-delay="100"
    >
      <template #activator="{ props }">
        <v-btn
          class="btn text-none px-0"
          width="100"
          height="50"
          tile
          :ripple="false"
          v-bind="props"
          @mouseenter="addAnimation = true"
          @mouseleave="addAnimation = false"
        >
          <template #append>
            <v-icon :class="{'add-animation': addAnimation}" size="22" icon="mdi-chevron-down"  ></v-icon>
          </template>
          Курсы</v-btn
        >
      </template>
      <v-card width="150" elevation="5" tile>
        <v-list class="pa-0" color="blue">
          <v-list-item
            v-for="course in listOfCourses"
            :key="course.id"
            :value="course.id"
            min-height="32"
            rounded="0"
          >
            <v-list-item-title> {{ course.title }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-spacer></v-spacer>
    <v-text-field
      class="search align-center py-0 mr-5"
      label="Поиск"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      max-width="230"
      density="compact"
      hide-details
      single-line
      bg-color="rgb(105, 105, 105)"
    >
    </v-text-field>
    <v-btn
      v-if="unRegisteredUser"
      class="btn text-none px-0 mr-5"
      width="150"
      height="30"
      variant="outlined"
      @click="autorizationVisible = true"
    >
      <template #prepend>
        <v-icon size="22" icon="mdi-account-circle"></v-icon>
      </template>
      Авторизация</v-btn
    >
    <v-menu v-if="!unRegisteredUser" v-model="profileMenu">
      <template #activator="{ props }">
        <v-btn
          class="btn text-none px-0 mr-5"
          width="150"
          height="30"
          variant="outlined"
          v-bind="props"
        >
          <template #append>
            <v-icon :class="{'add-animation': profileMenu}" size="22" icon="mdi-chevron-down"></v-icon>
          </template>
          {{ currentUser.fullShortName }}</v-btn
        >
      </template>
      <v-card width="200" elevation="5" tile>
        <v-list class="pa-0" color="green" slim>
          <v-list-item
            v-for="item in profileItems"
            :key="item.id"
            :value="item.id"
            min-height="32"
            rounded="0"
            @click="item.action"
          >
            <template #prepend>
              <v-icon style="color: #aaafb9" :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
  <RegForm v-model="autorizationVisible" />
  <!-- v-model:visible-form="autorizationVisible"
  @update-visible-form="(newValue) => autorizationVisible = newValue" -->
</template>

<style lang="scss" scoped>
.navbar {
  background-color: rgb(34, 34, 34) !important;
  color: white !important;
  .img-bg {
    background-color: white;
  }
  .btn,
  .btn-main {
    letter-spacing: 0;
    font-size: 16px;
    &:hover {
      background-color: rgb(119, 119, 119);
    }
  }
  .add-animation {
    transition: 0.2s;
    transform: rotate(180deg);
  }
}
</style>
