<script setup lang="ts">
import type { ICourseInfo } from '@/interfaces';
import { computed, ref, useTemplateRef } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { useCoursesStore } from '@/stores/CoursesStore';

const coursesStore = useCoursesStore();
const userStore = useUserStore();
const currentUser = computed(() => userStore.currentUser);
const alertMessage = computed({
  get: () => coursesStore.alertMessage,
  set: (value) => coursesStore.alertMessage = value
});

const props = defineProps<{
  course: ICourseInfo
}>();
const emit = defineEmits(['updateInfo', 'deleteCourse', 'editCard']);

const isEditedCourseInfo = ref(false);
const confirmDialog = ref(false);
const form = useTemplateRef<HTMLFormElement>('form');

const updateCard = async () => {
  const { valid } = await form.value?.validate();
  if (valid) {
    isEditedCourseInfo.value = false;
    emit('updateInfo', props.course.id);
    emit('editCard', false);
  }
};

const deleteCard = () => {
  confirmDialog.value = false;
  emit('deleteCourse', props.course.id);
  emit('editCard', false);
};

const editCard = () => {
  isEditedCourseInfo.value = true;
  emit('editCard', true);
};

const closeEditor = () => {
  alertMessage.value = { type: 'warning', message: 'Изменения не сохранены в базе' };
  setTimeout(() => alertMessage.value = null, 3000);
  isEditedCourseInfo.value = false;
  emit('editCard', false);
};
</script>

<template>
  <div :class="{'card': !isEditedCourseInfo}">
    <v-form ref="form" class="desc-card d-flex ga-6 mb-3">
      <VTextarea
        v-if="isEditedCourseInfo"
        v-model.trim="course.img"
        variant="outlined"
        hide-details="auto"
        width="100"
        density="compact"
        placeholder="Ссылка на изображение"
        auto-grow
        :rules="[(v) => !!v || 'Поле обязательно для заполнения']"
      />
      <img v-else :src="course.img" alt="Логотип" height="110" class="mt-1" />
      <div class="desc-card-text d-flex flex-column ga-2">
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <VTextField
              v-if="isEditedCourseInfo"
              v-model.trim="course.title"
              variant="outlined"
              hide-details="auto"
              width="500"
              density="compact"
              clearable
              :rules="[(v) => !!v || 'Поле обязательно для заполнения']"
            />
            <h4 v-else style="line-height: 1">{{ course.title }}</h4>
            <VSpacer />
            <div class="d-flex ga-1" v-if="currentUser?.role === 'Admin'">
              <v-btn
                v-if="!isEditedCourseInfo"
                @click="editCard"
                variant="outlined"
                rounded="xl"
                size="30"
                color="blue"
                class="btn"
              >
                <v-icon size="18">mdi-pen</v-icon>
              </v-btn>
              <v-btn
                v-else
                @click.stop="updateCard"
                variant="outlined"
                rounded="xl"
                size="30"
                color="green"
                class="btn"
              >
                <v-icon size="18">mdi-check</v-icon>
              </v-btn>
              <v-btn
                v-if="!isEditedCourseInfo"
                @click.stop="confirmDialog = true"
                variant="outlined"
                rounded="xl"
                size="30"
                color="red"
                class="btn"
              >
                <v-icon size="18">mdi-delete</v-icon>
              </v-btn>
              <v-btn
                v-else
                @click.stop="closeEditor"
                variant="outlined"
                rounded="xl"
                size="30"
                color="red"
                class="btn"
              >
                <v-icon size="18">mdi-close</v-icon>
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
                  Вы уверены, что хотите удалить курс «{{ course.title }}»?
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="text-none mr-2"
                    style="letter-spacing: 0; font-size: 16px"
                    variant="flat"
                    color="red"
                    @click="deleteCard"
                  >
                    Удалить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <VTextField
            class="mt-2"
            v-if="isEditedCourseInfo"
            v-model.trim="course.authors"
            variant="outlined"
            hide-details="auto"
            width="500"
            density="compact"
            clearable
            :rules="[(v) => !!v || 'Поле обязательно для заполнения']"
          />
          <p v-else>{{ course.authors }}</p>
        </div>
        <VTextarea
          v-if="isEditedCourseInfo"
          v-model.trim="course.description"
          variant="outlined"
          hide-details="auto"
          width="756"
          density="compact"
          clearable
          auto-grow
          no-resize
          :rules="[(v) => !!v || 'Поле обязательно для заполнения']"
        />
        <p v-else>{{ course.description }}</p>
        <div class="d-flex ga-3">
          <VTextField
            v-if="isEditedCourseInfo"
            v-model.trim="course.price"
            variant="outlined"
            hide-details="auto"
            max-width="150"
            density="compact"
            clearable
            :rules="[(v) => !!v || 'Поле обязательно для заполнения']"
          />
          <v-chip v-else :color="course.price === 'Бесплатно' ? 'green' : 'red'" size="small">
            {{ course.price }}
          </v-chip>
          <VAutocomplete
            v-if="isEditedCourseInfo"
            v-model.trim="course.level"
            max-width="300"
            density="compact"
            hide-details="auto"
            placeholder="Выберите уровень сложности"
            :items="['Начальный уровень', 'Средний уровень', 'Продвинутый уровень']"
            variant="outlined"
            open-on-clear
            :rules="[(v) => !!v || 'Поле обязательно для заполнения']"
          />
          <v-chip
            v-else
            :color="course.level === 'Начальный уровень' ? 'blue' : course.level === 'Средний уровень' ? 'yellow' : 'orange'"
            variant="flat"
            size="small"
          >
            {{ course.level }}
          </v-chip>
        </div>
      </div>
    </v-form>
    <VDivider />
  </div>
</template>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  .desc-card-text {
    p {
      font-size: 14px;
    }
    h4:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 425px) {
  .desc-card {
    flex-direction: column;
    
    img {
      align-self: center;
    }
  }
  
  .desc-card-text {
    width: 100%;
  }
}

@media (max-width: 1200px) {
  .card {
    padding: 10px;
    .btn {
      display: none;
    }
  }
  
  .desc-card-text {
    h4 {
      font-size: 18px;
    }
    
    p {
      font-size: 13px;
    }
  }
  
  .v-chip {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .desc-card-text {
    h4 {
      font-size: 16px;
    }
    
    p {
      font-size: 12px;
    }
  }
}
</style>
