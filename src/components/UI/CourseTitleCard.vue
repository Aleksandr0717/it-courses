<script setup lang="ts">
import type { ICourseInfo } from '@/interfaces'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
const currentUser = computed(() => userStore.currentUser)
const props = defineProps<{
  course: ICourseInfo
}>()
const emit = defineEmits(['updateInfo', 'deleteCourse'])
const isEditedCourseInfo = ref(false)

const updateCourseTitleCard = () => {
  isEditedCourseInfo.value = false
  emit('updateInfo', props.course.id)
}

const deleteCourseTitleCard = () => {
  isEditedCourseInfo.value = false
  confirmDialog.value = false
  emit('deleteCourse', props.course.id)
}

const confirmDialog = ref(false)
</script>

<template>
  <div class="card">
    <div class="desc-card d-flex ga-6 mb-3">
      <v-textarea
        @click.stop
        v-if="isEditedCourseInfo"
        v-model.trim="course.img"
        variant="outlined"
        hide-details
        width="100"
        density="compact"
        placeholder="Ссылка на изображение"
        auto-grow
      ></v-textarea>
      <img v-else :src="course.img" alt="Логотип" height="110" class="mt-1" />
      <div class="desc-card-text d-flex flex-column ga-2">
        <div class="d-flex flex-column">
          <div class="d-flex align-center ga-1">
            <v-text-field
              @click.stop
              v-if="isEditedCourseInfo"
              v-model.trim="course.title"
              variant="outlined"
              hide-details
              width="500"
              density="compact"
              clearable
            ></v-text-field>
            <h4 v-else style="line-height: 1">{{ course.title }}</h4>
            <VSpacer />
            <v-btn
              v-if="!isEditedCourseInfo && currentUser.role === 'Admin'"
              @click.stop="isEditedCourseInfo = true"
              variant="outlined"
              rounded="xl"
              size="30"
              color="blue"
            >
              <v-icon size="18">mdi-pen</v-icon>
            </v-btn>
            <v-btn
              v-if="isEditedCourseInfo && currentUser.role === 'Admin'"
              @click.stop="updateCourseTitleCard"
              variant="outlined"
              rounded="xl"
              size="30"
              color="green"
            >
              <v-icon size="18">mdi-check</v-icon>
            </v-btn>
            <v-btn
              v-if="currentUser.role === 'Admin'"
              @click.stop="confirmDialog = true"
              variant="outlined"
              rounded="xl"
              size="30"
              color="red"
            >
              <v-icon size="18">mdi-delete</v-icon>
            </v-btn>
            <v-dialog v-model="confirmDialog" max-width="500" persistent>
              <v-card>
                <v-card-title class="ml-2 d-flex align-center justify-space-between">
                  Подтверждение
                  <v-btn variant="text" size="30" rounded="circle" @click="confirmDialog = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
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
                    @click="deleteCourseTitleCard"
                    >Удалить</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <v-text-field
            @click.stop
            v-if="isEditedCourseInfo"
            v-model.trim="course.authors"
            variant="outlined"
            hide-details
            width="500"
            density="compact"
            clearable
          ></v-text-field>
          <p v-else>{{ course.authors }}</p>
        </div>
        <v-textarea
          @click.stop
          v-if="isEditedCourseInfo"
          v-model.trim="course.description"
          variant="outlined"
          hide-details
          width="756"
          density="compact"
          clearable
          auto-grow
          no-resize
        ></v-textarea>
        <p v-else>{{ course.description }}</p>
        <div class="d-flex ga-3">
          <v-text-field
            @click.stop
            v-if="isEditedCourseInfo"
            v-model.trim="course.price"
            variant="outlined"
            hide-details
            max-width="150"
            density="compact"
            clearable
          ></v-text-field>
          <v-chip v-else :color="course.price === 'Бесплатно' ? 'green' : 'red'" size="small">{{
            course.price
          }}</v-chip>
          <v-autocomplete
            @click.stop
            v-if="isEditedCourseInfo"
            v-model.trim="course.level"
            max-width="300"
            density="compact"
            hide-details
            placeholder="Выберите уровень образования"
            :items="['Начальный уровень', 'Средний уровень', 'Продвинутый уровень']"
            variant="outlined"
            open-on-clear
          ></v-autocomplete>
          <v-chip
            v-else
            :color="
              course.level === 'Начальный уровень'
                ? 'blue'
                : course.level === 'Средний уровень'
                  ? 'yellow'
                  : 'orange'
            "
            variant="flat"
            size="small"
            >{{ course.level }}
          </v-chip>
        </div>
      </div>
    </div>
    <v-divider></v-divider>
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
</style>
