<script setup lang="ts">
const props = defineProps<{
  height: number
}>()
</script>

<template>
  <div class="d-flex justify-center align-center" :style="{ height: height + 'px'}">
    <v-progress-circular
      :size="50"
      color="green"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style lang="scss" scoped></style>