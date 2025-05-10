<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore.js';
import { ref } from 'vue';
import type { INavList } from '@/interfaces';
import { useForm, type GenericObject } from 'vee-validate';
import { regExpForEmail, regExpForLogin } from '@/constants/RegExpForForms';

const {
  handleSubmit: regHandleSubmit,
  isSubmitting: isRegSubmitting,
  errors: regErrors,
  defineField: regDefineField,
  resetForm: resetRegForm,
} = useForm({
  validationSchema: {
    regEmail(value: string): string | boolean {
      if (!value) return 'Поле обязательно для заполнения'
      else if (!regExpForEmail.test(value)) return 'Введите корректный e-mail'
      return true
    },
    regUsername(value: string): string | boolean {
      if (!value) return 'Поле обязательно для заполнения'
      else if (!regExpForLogin.test(value))
        return 'Логин должен содержать только латинские буквы и цифры'
      return true
    },
    regPassword(value: string): string | boolean {
      if (!value) return 'Поле обязательно для заполнения'
      else if (value.length < 6) return 'Пароль должен содержать не менее 6 символов'
      return true
    },
    checkPersonalData(value: boolean): string | boolean {
      if (!value) return 'Необходимо согласие'
      return true
    },
  },
});

const {
  handleSubmit: loginHandleSubmit,
  isSubmitting: isLoginSubmitting,
  errors: loginErrors,
  defineField: loginDefineField,
  resetForm: resetLoginForm,
} = useForm({
  validationSchema: {
    loginUsername(value: string): string | boolean {
      if (!value) return 'Поле обязательно для заполнения'
      else if (!regExpForLogin.test(value))
        return 'Логин должен содержать только латинские буквы и цифры'
      return true
    },
    loginPassword(value: string): string | boolean {
      if (!value) return 'Поле обязательно для заполнения'
      else if (value.length < 6) return 'Пароль должен содержать не менее 6 символов'
      return true
    },
  },
});

const [regEmail, regEmailAttrs] = regDefineField('regEmail');
const [regUsername, regUsernameAttrs] = regDefineField('regUsername');
const [regPassword, regPasswordAttrs] = regDefineField('regPassword');
const [checkPersonalData, checkPersonalDataAttrs] = regDefineField('checkPersonalData');
const [loginUsername, loginUsernameAttrs] = loginDefineField('loginUsername');
const [loginPassword, loginPasswordAttrs] = loginDefineField('loginPassword');

const onRegSubmit = regHandleSubmit(async (values: GenericObject) => {
  await userStore.INIT_CREATE_NEW_USER(values).finally(() => {
    tab.value = 2
    resetRegForm()
    resetLoginForm()
    profileMenu.value = false
  });
});

const onLoginSubmit = loginHandleSubmit(async (values: GenericObject) => {
  loading.value = true;
  await userStore.INIT_AUTORIZATION(values, checkRememberMe.value).finally(() => {
    localVisibleForm.value = false
    resetRegForm()
    resetLoginForm()
    loading.value = false
    tab.value = 1
    profileMenu.value = false
    checkRememberMe.value = false
  });
});

const closeForm = (): void => {
  localVisibleForm.value = false;
  resetRegForm();
  resetLoginForm();
  checkRememberMe.value = false;
};

const tabsArray = ref<INavList[]>([
  { id: 1, title: 'Регистрация', color: 'green' },
  { id: 2, title: 'Вход', color: 'blue' },
]);

const userStore = useUserStore();
const localVisibleForm = defineModel<boolean>('localVisibleForm');
const profileMenu = defineModel<boolean>('profileMenu');
const checkRememberMe = ref(false);
const tab = ref<number | null>(null);
const loading = ref(false);
const showRegPassword = ref(false);
const showLoginPassword = ref(false);
</script>

<template>
  <v-dialog
  v-model="localVisibleForm"
  opacity=".7"
  transition="dialog-bottom-transition"
  persistent
  >
    <v-card class="pa-2 form-login" width="400">
      <div class="header d-flex align-center mb-1">
        <v-tabs v-model="tab" density="compact">
          <v-tab
            v-for="item in tabsArray"
            :key="item.id"
            :value="item.id"
            class="btn text-none px-0 mx-1"
            :color="item.color"
            width="120"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
        <VSpacer />
        <VBtn @click="closeForm" icon="mdi-close" size="26" variant="text" />
      </div>
      <hr />
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
          <v-form
            class="mt-4 d-flex justify-center ga-4 flex-column"
            @submit.prevent="onRegSubmit"
            fast-fail
          >
            <VTextField
              class="align-center py-0 ml-3"
              label="Введите логин"
              variant="outlined"
              max-width="330"
              hide-details="auto"
              prepend-icon="mdi-account-edit"
              clearable
              :error-messages="regErrors.regUsername"
              v-model.trim="regUsername"
              v-bind="regUsernameAttrs"
            />
            <VTextField
              class="align-center py-0 ml-3"
              label="Введите e-mail"
              variant="outlined"
              max-width="330"
              bg-color="#FFFFFF4D"
              hide-details="auto"
              prepend-icon="mdi-email-outline"
              clearable
              :error-messages="regErrors.regEmail"
              v-model.trim="regEmail"
              v-bind="regEmailAttrs"
            />
            <VTextField
              class="align-center py-0 ml-3"
              label="Введите пароль"
              variant="outlined"
              max-width="330"
              bg-color="#FFFFFF4D"
              hide-details="auto"
              prepend-icon="mdi-key-variant"
              clearable
              :error-messages="regErrors.regPassword"
              v-model.trim="regPassword"
              v-bind="regPasswordAttrs"
              :append-inner-icon="showRegPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showRegPassword ? 'text' : 'password'"
              @click:append-inner="showRegPassword = !showRegPassword"
            />
            <VCheckbox
              label="Я соглашаюсь с условиями использования, политикой конфиденциальности и разрешаю обрабатывать мои персональные данные"
              v-model="checkPersonalData"
              v-bind="checkPersonalDataAttrs"
              :error-messages="regErrors.checkPersonalData"
              color="green"
              hide-details="auto"
              density="compact"
            />
            <v-btn
              class="btn text-none px-0 mr-3"
              height="30"
              color="green"
              flat
              block
              type="submit"
              :disabled="isRegSubmitting"
            >
              Зарегистрироваться
            </v-btn>
          </v-form>
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          <v-form
            class="form-control mt-4 d-flex justify-center ga-4 flex-column"
            @submit.prevent="onLoginSubmit"
            fast-fail
          >
            <VTextField
              class="align-center py-0 ml-3"
              label="Введите логин"
              variant="outlined"
              max-width="330"
              bg-color="#FFFFFF4D"
              hide-details="auto"
              prepend-icon="mdi-account-edit"
              clearable
              :error-messages="loginErrors.loginUsername"
              v-model.trim="loginUsername"
              v-bind="loginUsernameAttrs"
            />
            <VTextField
              class="align-center py-0 ml-3"
              label="Введите пароль"
              variant="outlined"
              max-width="330"
              bg-color="#FFFFFF4D"
              hide-details="auto"
              prepend-icon="mdi-key-variant"
              clearable
              :error-messages="loginErrors.loginPassword"
              v-model.trim="loginPassword"
              v-bind="loginPasswordAttrs"
              :append-inner-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showLoginPassword ? 'text' : 'password'"
              @click:append-inner="showLoginPassword = !showLoginPassword"
            />
            <div class="submit d-flex justify-space-between align-center">
              <VCheckbox
                class="ml-1"
                label="Запомнить меня"
                v-model="checkRememberMe"
                color="blue"
                hide-details
                density="compact"
              />
              <v-btn
                class="btn text-none px-0 mr-1"
                width="100"
                height="30"
                color="blue"
                flat
                type="submit"
                :disabled="isLoginSubmitting"
                :loading="loading"
              >
                Войти
              </v-btn>
            </div>
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.form-login {
  align-self: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 425px) {
    max-width: 100%;
    
    :deep(.v-input) {
      margin-left: 0 !important;
      .v-input__prepend {
        display: none;
      }
    }
    
    :deep(.v-tabs) {
      width: 100%;
      .v-tab {
        flex: 1;
      }
    }
    
    :deep(.v-checkbox) {
      .v-label {
        font-size: 14px;
        line-height: 1.2;
      }
    }
    
    .header {
      flex-direction: column-reverse;
      align-items: end !important;
    }
    .submit {
      flex-direction: column;
      gap: 5px;
      align-items: start !important;
    }
    .btn {
      width: 100% !important;
    }
  }
}
</style>
