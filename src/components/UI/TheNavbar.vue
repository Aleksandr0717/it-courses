<script setup lang="ts">
import { computed, ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import type { INavMenu } from '@/interfaces';
import { useRouter } from 'vue-router';
import { useCheckRegisteredUser } from '@/use/CheckRegisteredUser';
import RegForm from '@/views/RegForm.vue';
import { useUpperCaseFirstLetter } from '@/use/UpperCaseFirstLetter';

const { unRegisteredUser } = useCheckRegisteredUser();
const userStore = useUserStore();
const router = useRouter();

const listOfLanguages: INavMenu[] = [
  { id: 1, title: 'Python', color: 'blue',  action: () => router.push({ name: 'Courses', params: { lang: 'python' } }) },
  { id: 2, title: 'JavaScript', color: 'yellow', action: () => router.push({ name: 'Courses', params: { lang: 'js' } }) },
  { id: 3, title: 'C#', color: 'purple', action: () => router.push({ name: 'Courses', params: { lang: 'csharp' } }) },
];
const listOfLanguagesMobile: INavMenu[] = [
  { id: 0, title: 'EasyCode', color: 'green', action: () => router.push({ name: 'Home' }) },
  { id: 1, title: 'Python', color: 'blue', action: () => router.push({ name: 'Courses', params: { lang: 'python' } }) },
  { id: 2, title: 'JavaScript', color: 'yellow', action: () => router.push({ name: 'Courses', params: { lang: 'js' } }) },
  { id: 3, title: 'C#', color: 'purple', action: () => router.push({ name: 'Courses', params: { lang: 'csharp' } }) },
];

const profileItems: INavMenu[] = [
  {
    id: 1,
    title: 'Профиль',
    icon: 'mdi-account',
    color: 'green',
    action: () => router.push({ name: 'Profile' }),
  },
  {
    id: 2,
    title: 'Настройки',
    icon: 'mdi-cog-outline',
    color: 'blue',
    action: () => router.push({ name: 'Settings', params: { userData: 'personal' } }),
  },
  {
    id: 3,
    title: 'Выход',
    icon: 'mdi-import',
    color: 'red',
    action: () => {
      userStore.INIT_LOGOUT()
      router.push({ name: 'Home' })
      profileMenu.value = false
    },
  },
];

const autorizationVisible = ref(false);
const currentUser = computed(() => userStore.currentUser);
const addAnimation = ref(false);
const profileMenu = ref(false);
const fullShortName = computed(() => {
  if (currentUser.value?.name && currentUser.value?.lastName && currentUser.value?.secondName) {
    return useUpperCaseFirstLetter(currentUser.value?.lastName) + ' ' + currentUser.value?.name[0].toUpperCase() 
      + '.' + currentUser.value?.secondName[0].toUpperCase() + '.';
  } else if (currentUser.value?.name && currentUser.value?.lastName) {
    return useUpperCaseFirstLetter(currentUser.value?.lastName) + ' ' + currentUser.value?.name[0].toUpperCase() + '.';
  } else return '@' + currentUser.value?.login
});
</script>

<template>
  <v-app-bar height="50" class="navbar" flat>
    <v-btn class="btn text-none px-0 ml-0" width="150" height="50" tile @click="$router.push({ name: 'Home' })">
      <template #prepend>
        <div class="img-bg">
          <img src="https://static.thenounproject.com/png/6135611-84.png" alt="Лого" height="30" />
        </div>
      </template>
      EasyCode
    </v-btn>
    <div v-if="!unRegisteredUser">
      <v-menu v-if="!$vuetify.display.mobile" open-on-hover open-delay="0" close-delay="100">
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
              <VIcon
                :class="[{ 'add-animation': addAnimation }, { 'reset-animation': !addAnimation }]"
                size="22"
                icon="mdi-chevron-down"
              />
            </template>
            Курсы
          </v-btn>
        </template>
        <v-card width="150" elevation="5" tile>
          <v-list class="pa-0">
            <v-list-item
              v-for="language in listOfLanguages"
              :key="language.id"
              :value="language.id"
              :color="language.color"
              min-height="32"
              rounded="0"
              @click="language.action"
            >
              <v-list-item-title>{{ language.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu v-else>
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
              <VIcon
                :class="[{ 'add-animation': addAnimation }, { 'reset-animation': !addAnimation }]"
                size="22"
                icon="mdi-chevron-down"
              />
            </template>
            Курсы
          </v-btn>
        </template>
        <v-card width="150" elevation="5" tile>
          <v-list class="pa-0">
            <v-list-item
              v-for="language in listOfLanguages"
              :key="language.id"
              :value="language.id"
              :color="language.color"
              min-height="32"
              rounded="0"
              @click="language.action"
            >
              <v-list-item-title>{{ language.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            class="btn-mobile text-none pa-0"
            min-width="40"
            height="50"
            tile
            :ripple="false"
            v-bind="props"
            icon="mdi-menu"
          />
        </template>
        <v-card width="150" elevation="5" tile>
          <v-list class="pa-0">
            <v-list-item
              v-for="language in listOfLanguagesMobile"
              :key="language.id"
              :value="language.id"
              :color="language.color"
              min-height="32"
              rounded="0"
              @click="language.action"
            >
              <v-list-item-title>{{ language.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <VSpacer />
    <v-btn
      v-if="unRegisteredUser"
      class="btn-login text-none px-0 mr-5"
      width="150"
      height="30"
      variant="outlined"
      @click="autorizationVisible = true"
    >
      <template #prepend>
        <VIcon size="22" icon="mdi-account-circle" />
      </template>
      Авторизация
    </v-btn>
      <v-menu v-if="!unRegisteredUser" v-model="profileMenu">
        <template #activator="{ props }">
        <v-btn
          class="btn-login text-none px-0 mr-5"
          width="150"
          height="30"
          variant="outlined"
          v-bind="props"
          :loading="userStore.isLoading"
        >
          <template #append>
            <VIcon
              :class="[{ 'add-animation': profileMenu }, { 'reset-animation': !profileMenu }]"
              size="22"
              icon="mdi-chevron-down"
            />
          </template>
          {{ fullShortName }}
        </v-btn>
      </template>
      <v-card width="200" elevation="5" tile>
        <v-list class="pa-0" slim>
          <v-list-item
            v-for="item in profileItems"
            :key="item.id"
            :value="item.id"
            min-height="32"
            rounded="0"
            @click="item.action"
            :color="item.color"
          >
            <template #prepend>
              <VIcon :color="item.color" :icon="item.icon" />
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
  <RegForm v-model:localVisibleForm="autorizationVisible" v-model:profileMenu="profileMenu" />
</template>

<style lang="scss" scoped>
.navbar {
  background-color: rgb(34, 34, 34) !important;
  color: white !important;

  .img-bg {
    background-color: white;
  }

  .btn,
  .btn-login,
  .btn-mobile {
    &:hover {
      background-color: rgb(119, 119, 119);
    }
  }
  .btn-mobile {
    display: none;
  }
  @media (max-width: 425px) {
    .btn {
      display: none;
    }
    .btn-mobile {
      display: block;
    }
    .btn-login {
      margin: 5px !important;
      font-size: 14px !important;
      width: 130px !important;
    }
  }

  .add-animation {
    transition: all 0.2s ease;
    transform: rotate(180deg);
  }

  .reset-animation {
    transition: all 0.2s ease;
  }
}
</style>
