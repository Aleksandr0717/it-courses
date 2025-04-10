<script setup lang="ts">
import type { ICourseInfo } from '@/interfaces'

const props = defineProps<{
  course: ICourseInfo
}>()
</script>

<template>
  <div class="card">
    <div class="desc-card d-flex ga-6 mb-3">
      <img :src="course.img" alt="Логотип" height="110" />
      <div class="desc-card-text d-flex flex-column ga-2">
        <div class="d-flex flex-column">
          <h4 style="line-height: 1">{{ course.title }}</h4>
          <p>{{ course.authors }}</p>
        </div>
        <p>{{ course.description }}</p>
        <div class="d-flex ga-3">
          <v-chip :color="course.priceColor" size="small">{{ course.price }}</v-chip>
          <v-chip :color="course.levelColor" variant="flat" size="small">{{ course.level }}</v-chip>
        </div>
      </div>
    </div>
    <v-divider class="mb-3"></v-divider>
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
