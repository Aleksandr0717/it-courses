<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore.js'
import { ref } from 'vue'
import type { ITabs } from '@/interfaces'
import { useForm } from 'vee-validate'
import { regExpForEmail } from '@/use/ValidationForms'

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
})

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
      return true
    },
    loginPassword(value: string): string | boolean {
      if (!value) return 'Поле обязательно для заполнения'
      else if (value.length < 6) return 'Пароль должен содержать не менее 6 символов'
      return true
    },
  },
})

const [regEmail, regEmailAttrs] = regDefineField('regEmail')
const [regUsername, regUsernameAttrs] = regDefineField('regUsername')
const [regPassword, regPasswordAttrs] = regDefineField('regPassword')
const [checkPersonalData, checkPersonalDataAttrs] = regDefineField('checkPersonalData')
const [loginUsername, loginUsernameAttrs] = loginDefineField('loginUsername')
const [loginPassword, loginPasswordAttrs] = loginDefineField('loginPassword')


const onRegSubmit = regHandleSubmit( async (values) => {
  await userStore.INIT_CREATE_NEW_USER({login: regUsername.value, password: regPassword.value, email: regEmail.value})
  .finally(() => {
    localVisibleForm.value = false
    resetRegForm()
    resetLoginForm()
    profileMenu.value = false
  })
})

const onLoginSubmit = loginHandleSubmit(async (values) => {
  loading.value = true
  await userStore.INIT_AUTORIZATION({login: loginUsername.value, password: loginPassword.value}, checkRememberMe.value)
    .finally(() => {
      localVisibleForm.value = false
      resetRegForm()
      resetLoginForm()
      loading.value = false
      tab.value = 1
      profileMenu.value = false
    })
})

const closeForm = (): void => {
  localVisibleForm.value = false
  resetRegForm()
  resetLoginForm()
  checkRememberMe.value = false
}

const tabsArray = ref<ITabs[]>([
  { id: 1, title: 'Регистрация', color: 'green' },
  { id: 2, title: 'Вход', color: 'blue' },
])

const userStore = useUserStore()
const localVisibleForm = defineModel<boolean>('localVisibleForm')
const profileMenu = defineModel<boolean>('profileMenu')
const checkRememberMe = ref(false)
const tab = ref<number | null>(null)
const loading = ref(false)
</script>

<template>
  <v-dialog
    v-model="localVisibleForm"
    opacity="0.7"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card class="pa-2 form-login" width="400">
      <div class="form-buttons d-flex align-center mb-1">
        <v-tabs v-model="tab" density="compact">
          <v-tab
            v-for="item in tabsArray"
            :key="item.id"
            :value="item.id"
            class="form-btn text-none px-0 mx-1"
            :color="item.color"
            width="120"
          >
            {{ item.title }}
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-btn @click="closeForm" icon="mdi-close" size="26" variant="text">
        </v-btn>
      </div>
      <hr />
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
          <v-form
            class="mt-4 d-flex justify-center ga-4 flex-column"
            @submit.prevent="onRegSubmit"
          >
            <v-text-field
              class="search align-center py-0 ml-3"
              label="Введите логин"
              variant="outlined"
              max-width="330"
              hide-details="auto"
              prepend-icon="mdi-account-edit"
              clearable
              :error-messages="regErrors.regUsername"
              v-model.trim="regUsername"
              v-bind="regUsernameAttrs"
            ></v-text-field>
            <v-text-field
              class="search align-center py-0 ml-3"
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
            >
            </v-text-field>
            <v-text-field
              class="search align-center py-0 ml-3"
              label="Введите пароль"
              type="password"
              variant="outlined"
              max-width="330"
              bg-color="#FFFFFF4D"
              hide-details="auto"
              prepend-icon="mdi-key-variant"
              clearable
              :error-messages="regErrors.regPassword"
              v-model.trim="regPassword"
              v-bind="regPasswordAttrs"
            >
            </v-text-field>
            <v-checkbox
              label="Я соглашаюсь с условиями использования, политикой конфиденциальности и разрешаю обрабатывать мои персональные данные"
              v-model="checkPersonalData"
              v-bind="checkPersonalDataAttrs"
              :error-messages="regErrors.checkPersonalData"
              color="green"
              hide-details="auto"
              density="compact"
            ></v-checkbox>
            <v-btn
              class="form-btn text-none px-0 mr-3"
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
          >
            <v-text-field
              class="search align-center py-0 ml-3"
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
            >
            </v-text-field>
            <v-text-field
              class="search align-center py-0 ml-3"
              label="Введите пароль"
              type="password"
              variant="outlined"
              max-width="330"
              bg-color="#FFFFFF4D"
              hide-details="auto"
              prepend-icon="mdi-key-variant"
              clearable
              :error-messages="loginErrors.loginPassword"
              v-model.trim="loginPassword"
              v-bind="loginPasswordAttrs"
            >
            </v-text-field>
            <div class="form-submit d-flex justify-space-between align-center">
              <v-checkbox
                class="ml-3"
                label="Запомнить меня"
                v-model="checkRememberMe"
                color="blue"
                hide-details
                density="compact"
              ></v-checkbox>
              <v-btn
                class="form-btn text-none px-0 mr-3"
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
  left: 750px;
  .form-btn {
    letter-spacing: 0;
    font-size: 16px;
  }
}
.form-register {
  top: 270px;
  left: 750px;
  .form-btn {
    letter-spacing: 0;
    font-size: 16px;
  }
}
</style>
