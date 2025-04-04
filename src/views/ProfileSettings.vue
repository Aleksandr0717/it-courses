<script setup lang="ts">
import { ref, computed } from 'vue';
import type { INavLink } from '@/interfaces';
import { useForm } from 'vee-validate';
import { regExpForEmail } from '@/use/ValidationForms';
import { useUserStore } from '@/stores/UserStore.js';

const userStore = useUserStore();
const currentUser = computed(() => userStore.currentUser);

const educationLevels = ref<string[]>([
  'Основное общее',
  'Среднее общее',
  'Среднее профессиональное',
  'Бакалавриат',
  'Специалитет',
  'Магистратура',
]);
const navLinks = ref<INavLink[]>([
  {
    id: 1,
    title: 'Личная информация',
    to: { name: 'Settings', params: { userData: 'personal' } },
    addClass: false,
    action: () => {
      emailResetForm();
      passwordResetForm();
    },
  },
  {
    id: 2,
    title: 'Изменить почту',
    to: { name: 'Settings', params: { userData: 'email' } },
    addClass: true,
    action: () => passwordResetForm(),
  },
  {
    id: 3,
    title: 'Изменить пароль',
    to: { name: 'Settings', params: { userData: 'password' } },
    addClass: true,
    action: () => emailResetForm(),
  },
]);

const isDisabledPersonalData = ref(true);

const {
  handleSubmit: emailHandleSubmit,
  defineField: emailDefineField,
  resetForm: emailResetForm,
  errors: emailErrors,
} = useForm({
  validationSchema: {
    newEmail(value: string): string | boolean {
      if (!regExpForEmail.test(value)) return 'Введите корректный e-mail';
      return true;
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
      if (!value?.length) return 'Введите текущий пароль';
      return true;
    },
    password(value: string): string | boolean {
      if (!value?.length && currentPassword.value)
        return 'Введите новый пароль';
      else if (value?.length < 6)
        return 'Пароль должен содержать не менее 6 символов';
      return true;
    },
    repeatedPassword(value: string): string | boolean {
      if (value !== newPassword.value) return 'Пароли не совпадают';
      return true;
    },
  },
});

const [newEmail, newEmailAttrs] = emailDefineField('newEmail');
const [currentPassword, currentPasswordAttrs] =
  passwordDefineField('currentPassword');
const [newPassword, newPasswordAttrs] = passwordDefineField('password');
const [repeatedPassword, repeatedPasswordAttrs] =
  passwordDefineField('repeatedPassword');

const savePersonalDataChange = (): void => {
  isDisabledPersonalData.value = true;
  alert('Изменения сохранены');
};

const saveEmailChange = emailHandleSubmit((values) => {
  editUser.email = newEmail.value;
  emailResetForm();
  alert('Изменения сохранены');
});

const savePasswordChange = passwordHandleSubmit((values) => {
  console.log(values);
  passwordResetForm();
  alert('Изменения сохранены');
});

const editUser = currentUser.value;
const onEditFields = () => {
  isDisabledPersonalData.value = false;
};
</script>

<template>
  <div class="main d-flex">
    <div class="back-btn">
      <v-btn
        variant="text"
        tile
        width="300"
        height="803"
        icon="mdi-arrow-left"
        @click="$router.back()"
      />
    </div>
    <div
      v-if="$route.params.userData === 'personal'"
      class="editable-items mt-7"
    >
      <div class="header text-center d-flex flex-column">
        <h3>Личная информация</h3>
        <VDivider opacity=".3" />
      </div>
      <div class="editable-item">
        <label style="margin-right: 103px;" for="name">Имя:</label>
        <p v-if="isDisabledPersonalData">{{ editUser.name }}</p>
        <v-text-field
          v-else
          v-model="editUser.name"
          variant="outlined"
          hide-details
          max-width="545"
          density="comfortable"
          clearable
        ></v-text-field>
      </div>
      <div class="editable-item">
        <label style="margin-right: 65px;" for="fam">Фамилия:</label>
        <p v-if="isDisabledPersonalData">{{ editUser.lastName }}</p>
        <v-text-field
          v-else
          v-model="editUser.lastName"
          variant="outlined"
          hide-details
          max-width="545"
          density="comfortable"
          clearable     
        ></v-text-field>
      </div>
      <div class="editable-item">
        <label style="margin-right: 91px;" for="city">Город:</label>
        <p v-if="isDisabledPersonalData">{{ editUser.city }}</p>
        <v-text-field
          v-else
          v-model="editUser.city"
          variant="outlined"
          hide-details
          max-width="545"
          density="comfortable"
          clearable
        ></v-text-field>
      </div>
      <div class="editable-item">
        <label class="mr-9" for="education">Образование:</label>
        <p v-if="isDisabledPersonalData">{{ editUser.education }}</p>
        <v-autocomplete
        v-else
        v-model="editUser.education"
        max-width="330"
        clearable
        density="comfortable"
        hide-details
        placeholder="Выберите уровень образования"
        :items="educationLevels"
        variant="outlined"
        open-on-clear
        ></v-autocomplete>
      </div>
      <div class="editable-item">
        <label style="margin-right: 73px;" for="about">Обо мне:</label>
        <p v-if="isDisabledPersonalData">{{ editUser.aboutMe }}</p>
        <v-textarea
          v-else
          v-model="editUser.aboutMe"
          variant="outlined"
          hide-details="auto"
          maxlength="255"
          counter="255"
          auto-grow
          max-width="545"
          min-width="545"
          clearable
        ></v-textarea>
      </div>
      <v-btn
        class="btn text-none mt-5"
        width="250"
        height="45"
        color="green"
        flat
        @click="onEditFields"
      >
        Редактировать информацию
      </v-btn>
      <v-btn
        class="btn text-none mt-5"
        width="200"
        height="45"
        color="blue"
        flat
        @click="savePersonalDataChange"
      >
        Сохранить изменения
      </v-btn>
    </div>
    <div
      v-else-if="$route.params.userData === 'email'"
      class="editable-items mt-7"
    >
      <div class="header text-center d-flex flex-column">
        <h3>Изменение почты</h3>
        <VDivider opacity=".3" />
      </div>
      <v-form @submit.prevent="saveEmailChange">
        <div class="editable-item ga-6">
          <label for="current-email">Текущий e-mail:</label>
          <p >{{ editUser.email }}</p>
        </div>
        <div class="editable-item ga-9">
          <label for="new-email">Новый e-mail:</label>
          <v-text-field
            v-model.trim="newEmail"
            v-bind="newEmailAttrs"
            :error-messages="emailErrors.newEmail"
            variant="outlined"
            hide-details="auto"
            max-width="520"
            density="comfortable"
            clearable
          ></v-text-field>
        </div>
        <v-btn
          class="btn text-none mt-5"
          width="200"
          height="45"
          color="blue"
          flat
          type="submit"
        >
          Сохранить изменения
        </v-btn>
      </v-form>
    </div>
    <div v-else class="editable-items mt-7">
      <div class="header text-center d-flex flex-column">
        <h3>Изменение пароля</h3>
        <VDivider opacity=".3" />
      </div>
      <v-form @submit.prevent="savePasswordChange">
        <div class="editable-item justify-space-between">
          <label for="current-password">Текущий пароль:</label>
          <v-text-field
            v-model.trim="currentPassword"
            v-bind="currentPasswordAttrs"
            :error-messages="passwordErrors.currentPassword"
            variant="outlined"
            hide-details="auto"
            max-width="520"
            density="comfortable"
            type="password"
            clearable
          ></v-text-field>
        </div>
        <div class="editable-item justify-space-between">
          <label for="new-password">Новый пароль:</label>
          <v-text-field
            v-model.trim="newPassword"
            v-bind="newPasswordAttrs"
            :error-messages="passwordErrors.password"
            variant="outlined"
            hide-details="auto"
            max-width="520"
            density="comfortable"
            type="password"
            clearable
          ></v-text-field>
        </div>
        <div class="editable-item justify-space-between">
          <label for="repeated-password">Повторите пароль:</label>
          <v-text-field
            v-model.trim="repeatedPassword"
            v-bind="repeatedPasswordAttrs"
            :error-messages="passwordErrors.repeatedPassword"
            variant="outlined"
            hide-details="auto"
            max-width="520"
            density="comfortable"
            type="password"
            clearable
          ></v-text-field>
        </div>
        <v-btn
          class="btn text-none mt-5"
          width="200"
          height="45"
          color="blue"
          flat
          type="submit"
        >
          Сохранить изменения
        </v-btn>
      </v-form>
    </div>
    <div class="nav-links mt-7 d-flex flex-column">
      <div
        :class="['d-inline', { 'mt-2': link.addClass }]"
        v-for="link in navLinks"
        :key="link.id"
      >
        <router-link
          class="nav-link"
          active-class="nav-link-active"
          :to="link.to"
          @click="link.action"
          >{{ link.title }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  margin: {
    right: 200px;
  }
  .back-btn {
    width: 15%;
    background-color: rgb(233, 233, 233);
  }
  .editable-items {
    width: 46%;
    margin-left: 200px;
    .editable-item {
      display: flex;
      margin-top: 25px;
      align-items: center;
      padding-inline: 50px;
      justify-content: start;
    }
    .btn {
      margin-left: 50px;
      letter-spacing: 0;
      font-size: 16px;
    }
  }
  .nav-links {
    width: 15%;
    padding: {
      inline: 50px;
      top: 20px;
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
