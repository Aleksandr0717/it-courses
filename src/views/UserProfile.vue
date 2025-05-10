<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useUpperCaseFirstLetter } from '@/use/UpperCaseFirstLetter';
import PageLoader from '@/components/UI/PageLoader.vue';

document.title = 'Профиль';
const userStore = useUserStore();
const currentUser = computed(() => userStore.currentUser);
const tableHeader = ['Имя и фамилия', 'Логин', 'User Id', 'Всего курсов'];


const nameAndFamily = computed(() => {
  if (!currentUser.value?.name && !currentUser.value?.lastName) return 'Не заполнено';
  else if (!currentUser.value?.name) return useUpperCaseFirstLetter(currentUser.value.lastName) + ' ...';
  else if (!currentUser.value?.lastName) return '... ' + useUpperCaseFirstLetter(currentUser.value.name);
  else return useUpperCaseFirstLetter(currentUser.value?.lastName) + ' ' + useUpperCaseFirstLetter(currentUser.value?.name);
});

const coursesCount = computed(() => {
  if (!currentUser.value?.title) return 0;
  else return currentUser.value?.title.length;
});
</script>

<template>
  <PageLoader v-if="userStore.isLoading" :height="700" />
  <div v-else class="main d-flex flex-column align-center ga-6">
    <div class="d-flex ga-6">
      <div class="back-btn">
        <VBtn variant="text" tile width="40" height="30" icon="mdi-arrow-left" @click="$router.back()" />
      </div>
      <div class="info d-flex flex-column ga-2">
        <h3>Ваши данные:</h3>
        <table class="table">
          <thead>
            <tr>
              <th v-for="str in tableHeader" :key="str">{{ str }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ nameAndFamily }}</td>
              <td>{{ '@' + currentUser?.login }}</td>
              <td>{{ currentUser?.id }}</td>
              <td>{{ coursesCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="currentUser?.title?.length" class="courses d-flex flex-column ga-2">
      <h3>Вы записались на курсы:</h3>
      <div class="courses-list d-flex flex-column ga-2">
        <ul v-for="(course, i) in currentUser?.title" :key="i">
          <li>{{ course }}</li>
        </ul>
      </div>
    </div>
    <div v-else class="courses">
      <h3>Вы еще не записались на курсы.</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$border-color: #dddddd;

.main {
  .back-btn {
    margin-top: 68px;
    width: 40px;
    height: 30px;
    background-color: rgb(233, 233, 233);
    
    @media (max-width: 576px) {
      display: none;
    }
  }
  
  .info {
    margin-top: 70px;
    width: 750px;

    @media (max-width: 992px) {
      width: 600px;
    }

    @media (max-width: 768px) {
      width: 90%;
      margin-top: 40px;
      margin-left: 15px;
    }
    
    .table {
      width: 100%;
      border: 1px solid $border-color;
      border-collapse: collapse;

      @media (max-width: 576px) {
        font-size: 14px;
      }
      
      th {
        padding: 5px;
        background: #efefef;
        border: 1px solid $border-color;

        @media (max-width: 576px) {
          padding: 3px;
        }
      }
      
      td {
        border: 1px solid $border-color;
        padding: 5px;
        text-align: center;

        @media (max-width: 576px) {
          padding: 3px;
        }
      }
    }
  }
  
  .courses {
    width: 690px;

    @media (max-width: 768px) {
      width: 90%;
      align-items: center !important;
    }
    
    ul {
      list-style: none;
      
      li::before {
        content: "\203A";
        margin-right: 10px;
      }
    }
  }
}
</style>