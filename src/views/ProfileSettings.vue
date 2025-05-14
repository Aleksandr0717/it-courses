<script setup lang="ts">
import { ref, computed } from 'vue';
import type { INavLink } from '@/interfaces';
import { useForm, type GenericObject } from 'vee-validate';
import { regExpForEmail } from '@/constants/RegExpForForms';
import { useUserStore } from '@/stores/UserStore';
import { useRouter } from 'vue-router';
import PageLoader from '@/components/UI/PageLoader.vue';

document.title = 'Настройки профиля';
const router = useRouter();
const userStore = useUserStore();
const currentUser = computed({
  get() {
    const editUser = Object.assign(userStore.currentUser!);
    return editUser;
  },
  set(value) {
    currentUser.value = value;
  },
});

const educationLevels: string[] = [
  'Основное общее',
  'Среднее общее',
  'Среднее профессиональное',
  'Бакалавриат',
  'Специалитет',
  'Магистратура',
];
const navLinks: INavLink[] = [
  {
    id: 1,
    title: 'Личная информация',
    to: { name: 'Settings', params: { userData: 'personal' } },
    action: () => {
      emailResetForm()
      passwordResetForm()
    },
  },
  {
    id: 2,
    title: 'Изменить почту',
    to: { name: 'Settings', params: { userData: 'email' } },
    action: () => {
      passwordResetForm()
      isDisabledPersonalData.value = true
    },
  },
  {
    id: 3,
    title: 'Изменить пароль',
    to: { name: 'Settings', params: { userData: 'password' } },
    action: () => {
      emailResetForm()
      isDisabledPersonalData.value = true
    },
  },
];

const {
  handleSubmit: emailHandleSubmit,
  defineField: emailDefineField,
  resetForm: emailResetForm,
  errors: emailErrors,
} = useForm({
  validationSchema: {
    newEmail(value: string): string | boolean {
      if (!regExpForEmail.test(value)) return 'Введите корректный e-mail'
      else if (value === currentUser.value?.email) return 'Новый e-mail совпадает с текущим'
      return true
    },
  },
});

const {
  handleSubmit: passwordHandleSubmit,
  defineField: passwordDefineField,
  resetForm: passwordResetForm,
  errors: passwordErrors,
} = useForm({
  validationSchema: {
    currentPassword(value: string): string | boolean {
      if (!value?.length) return 'Введите текущий пароль'
      else if (value !== currentUser.value?.password) return 'Неверный текущий пароль'
      return true
    },
    newPassword(value: string): string | boolean {
      if (!value?.length && currentPassword.value) return 'Введите новый пароль'
      else if (value?.length < 6) return 'Пароль должен содержать не менее 6 символов'
      else if (value === currentUser.value?.password) return 'Новый пароль совпадает с текущим'
      return true
    },
    repeatedPassword(value: string): string | boolean {
      if (value !== newPassword.value) return 'Пароли не совпадают'
      return true
    },
  },
});

const [newEmail, newEmailAttrs] = emailDefineField('newEmail');
const [currentPassword, currentPasswordAttrs] = passwordDefineField('currentPassword');
const [newPassword, newPasswordAttrs] = passwordDefineField('newPassword');
const [repeatedPassword, repeatedPasswordAttrs] = passwordDefineField('repeatedPassword');

const savePersonalDataChange = async (): Promise<void> => {
  await userStore.INIT_UPDATE_USER_DATA(currentUser.value).finally(() => {
    isDisabledPersonalData.value = true;
  });
};

const saveEmailChange = emailHandleSubmit(async (value: GenericObject) => {
  currentUser.value.email = value.newEmail;
  emailResetForm();
  await userStore.INIT_UPDATE_USER_DATA(currentUser.value);
});

const savePasswordChange = passwordHandleSubmit(async (values: GenericObject) => {
  currentUser.value.password = values.newPassword;
  await userStore.INIT_UPDATE_USER_DATA(currentUser.value).finally(() =>{
    passwordResetForm();
  });
});

const isDisabledPersonalData = ref(true);
const confirmDialog = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showRepeatedPassword = ref(false);

const deleteAccount = async (): Promise<void> => {
  confirmDialog.value = false;
  await userStore.INIT_DELETE_USER(currentUser.value);
  userStore.INIT_LOGOUT();
  router.push({ name: 'Home' });
};

const returnBack = () => {
  router.back();
  emailResetForm();
  passwordResetForm();
  isDisabledPersonalData.value = true;
};
</script>

<template>
  <div class="main d-flex justify-center">
    <div class="back-btn">
      <VBtn variant="text" tile width="40" height="30" icon="mdi-arrow-left" @click="returnBack" />
    </div>
    <div v-if="$route.params.userData === 'personal'" class="editable-items mt-7">
      <div class="header text-center d-flex flex-column">
        <h3>Личная информация</h3>
        <VDivider opacity=".3" />
      </div>
      <PageLoader v-if="userStore.isLoading" :height="400" />
      <div v-else>
        <div class="editable-item">
          <label style="margin-right: 58px" for="fam">Фамилия<p style="color: red; display: inline;">*</p>:</label>
          <p v-if="isDisabledPersonalData">{{ currentUser.lastName }}</p>
          <VTextField
            v-else
            v-model.trim="currentUser.lastName"
            variant="outlined"
            hide-details
            max-width="545"
            density="comfortable"
            clearable
          />
        </div>
        <div class="editable-item">
          <label style="margin-right: 96px" for="name">Имя<p style="color: red; display: inline;">*</p>:</label>
          <p v-if="isDisabledPersonalData">{{ currentUser.name }}</p>
          <VTextField
            v-else
            v-model.trim="currentUser.name"
            variant="outlined"
            hide-details
            max-width="545"
            density="comfortable"
            clearable
          />
        </div>
        <div class="editable-item">
          <label style="margin-right: 63px" for="fam">Отчество:</label>
          <p v-if="isDisabledPersonalData">{{ currentUser.secondName }}</p>
          <VTextField
            v-else
            v-model.trim="currentUser.secondName"
            variant="outlined"
            hide-details
            max-width="545"
            density="comfortable"
            clearable
          />
        </div>
        <div class="editable-item">
          <label style="margin-right: 90px" for="city">Город:</label>
          <p v-if="isDisabledPersonalData">{{ currentUser.city }}</p>
          <VTextField
            v-else
            v-model.trim="currentUser.city"
            variant="outlined"
            hide-details
            max-width="545"
            density="comfortable"
            clearable
          />
        </div>
        <div class="editable-item">
          <label style="margin-right: 34px" for="education">Образование:</label>
          <p v-if="isDisabledPersonalData">{{ currentUser.education }}</p>
          <VAutocomplete
            v-else
            v-model.trim="currentUser.education"
            max-width="330"
            clearable
            density="comfortable"
            hide-details
            placeholder="Выберите уровень образования"
            :items="educationLevels"
            variant="outlined"
            open-on-clear
          />
        </div>
        <div class="editable-item align-start">
          <label style="margin-right: 71px" for="about">Обо мне:</label>
          <p v-if="isDisabledPersonalData">{{ currentUser.aboutMe }}</p>
          <VTextarea
            v-else
            v-model.trim="currentUser.aboutMe"
            variant="outlined"
            hide-details="auto"
            maxlength="255"
            counter="255"
            auto-grow
            max-width="545"
            clearable
          />
        </div>
        <div class="recommended">
          <p style="color: red">*</p> 
          <p> - Рекомендуемые для заполнения поля</p>
        </div>
        <v-btn
          v-if="isDisabledPersonalData"
          class="btn text-none mt-5"
          width="250"
          height="45"
          color="green"
          flat
          @click="isDisabledPersonalData = false"
        >
          Редактировать информацию
        </v-btn>
        <v-btn
          v-else
          class="btn text-none mt-5"
          width="200"
          height="45"
          color="blue"
          flat
          @click="savePersonalDataChange"
        >
          Сохранить изменения
        </v-btn>
        <v-btn
          v-if="isDisabledPersonalData"
          class="btn text-none mt-5"
          width="150"
          height="45"
          color="red"
          flat
          @click="confirmDialog = true"
        >
          Удалить аккаунт
        </v-btn>
      </div>
      <v-dialog v-model="confirmDialog" max-width="500" persistent>
        <v-card>
          <v-card-title class="ml-2 d-flex align-center justify-space-between">
            Подтверждение
            <v-btn variant="text" size="30" rounded="circle" @click="confirmDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            Удаление аккаунта приведет к потере прогресса в курсах. Вы точно хотите удалить аккаунт?
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="text-none mr-2"
              style="letter-spacing: 0; font-size: 16px"
              variant="flat"
              color="red"
              @click="deleteAccount"
            >
              Удалить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else-if="$route.params.userData === 'email'" class="editable-items mt-lg-7">
      <div class="header text-center d-flex flex-column">
        <h3>Изменение почты</h3>
        <VDivider opacity=".3" />
      </div>
      <PageLoader v-if="userStore.isLoading" :height="150" />
      <v-form v-else @submit.prevent="saveEmailChange">
        <div class="editable-item ga-6">
          <label for="current-email">Текущий e-mail:</label>
          <p>{{ currentUser.email }}</p>
        </div>
        <div class="editable-item ga-9">
          <label for="new-email">Новый e-mail:</label>
          <VTextField
            v-model.trim="newEmail"
            v-bind="newEmailAttrs"
            :error-messages="emailErrors.newEmail"
            variant="outlined"
            hide-details="auto"
            max-width="520"
            density="comfortable"
            clearable
          />
        </div>
        <v-btn class="btn text-none mt-5" width="200" height="45" color="blue" flat type="submit">
          Сохранить изменения
        </v-btn>
      </v-form>
    </div>
    <div v-else class="editable-items mt-lg-7">
      <div class="header text-center d-flex flex-column">
        <h3>Изменение пароля</h3>
        <VDivider opacity=".3" />
      </div>
      <v-form @submit.prevent="savePasswordChange">
        <div class="editable-item justify-space-between ga-sm-5">
          <label for="current-password">Текущий пароль:</label>
          <VTextField
            v-model.trim="currentPassword"
            v-bind="currentPasswordAttrs"
            :error-messages="passwordErrors.currentPassword"
            variant="outlined"
            hide-details="auto"
            max-width="510"
            density="comfortable"
            clearable
            :append-inner-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showCurrentPassword ? 'text' : 'password'"
            @click:append-inner="showCurrentPassword = !showCurrentPassword"
          />
        </div>
        <div class="editable-item justify-space-between ga-sm-9">
          <label for="new-password">Новый пароль:</label>
          <VTextField
            v-model.trim="newPassword"
            v-bind="newPasswordAttrs"
            :error-messages="passwordErrors.newPassword"
            variant="outlined"
            hide-details="auto"
            max-width="510"
            density="comfortable"
            clearable
            :append-inner-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showNewPassword ? 'text' : 'password'"
            @click:append-inner="showNewPassword = !showNewPassword"
          />
        </div>
        <div class="editable-item justify-space-between ga-sm-2">
          <label for="repeated-password">Повторите пароль:</label>
          <VTextField
            v-model.trim="repeatedPassword"
            v-bind="repeatedPasswordAttrs"
            :error-messages="passwordErrors.repeatedPassword"
            variant="outlined"
            hide-details="auto"
            max-width="510"
            density="comfortable"
            clearable
            :append-inner-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showRepeatedPassword ? 'text' : 'password'"
            @click:append-inner="showRepeatedPassword = !showRepeatedPassword"
          />
        </div>
        <v-btn class="btn text-none mt-5" width="200" height="45" color="blue" flat type="submit">
          Сохранить изменения
        </v-btn>
      </v-form>
    </div>
    <div class="nav-links mt-7 d-flex flex-column ga-2">
      <div class="d-inline" v-for="link in navLinks" :key="link.id">
        <router-link
          class="nav-link"
          active-class="nav-link-active"
          :to="link.to"
          @click="link.action"
        >
          {{ link.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  @media (max-width: 768px) {
    padding-bottom: 30px;
    flex-direction: column;
    align-items: center;
  }
  .back-btn {
    margin-top: 27px;
    width: 40px;
    height: 30px;
    background-color: rgb(233, 233, 233);
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  .editable-items {
    width: 762px;
    .editable-item {
      display: flex;
      margin-top: 25px;
      align-items: center;
      padding-inline: 50px;
      justify-content: start;
    }
    .btn {
      margin-left: 50px;
    }
    .recommended {
      padding-left: 50px;
      margin-top: 20px;
      font-size: 13px;
      p {
        display: inline;
      }
    }
  
    @media (max-width: 768px) {
      width: 100%;
      max-width: 762px;
      margin-top: 0 !important;
    }
  
    @media (max-width: 768px) {
      .editable-item {
        flex-direction: column;
        align-items: start;
        padding-inline: 20px;
        gap: 10px !important;
        
        :deep(.v-input) {
          width: 100%;
        }
      }
      .btn {
        margin-left: 20px;
        width: calc(100% - 40px) !important;
      }
      .recommended {
        padding-left: 20px !important;
      }
    }
  }
  
  .nav-links {
    width: 285px;
    padding: {
      inline: 50px;
      top: 20px;
    }
    @media (max-width: 768px) {
      gap: 0 !important;
      padding: {
        top: 10px;
        inline: 20px;
      }
      order: -1;
      width: 100%;
      flex-direction: row !important;
      justify-content: space-evenly;
      margin-top: 0 !important;
    }
    @media (max-width: 425px) {
      flex-direction: column !important;
    }
  
    .nav-link {
      color: green;
      text-decoration: none;
      &:hover {
        border-bottom: 1px solid;
      }
      &:active {
        opacity: 0.7;
        border: 0;
      }
    }
    .nav-link-active {
      border-bottom: 1px solid;
    }
  }
}
</style>
