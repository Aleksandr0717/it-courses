<script setup lang="ts">
const searchQuery = defineModel<string>()
</script>

<template>
  <div class="d-flex justify-center align-center flex-column ga-4 mb-3">
    <slot name="title"></slot>
    <slot name="description"></slot>
  </div>
  <VTextField 
    label="Начните вводить название курса"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    max-width="500"
    density="compact"
    hide-details
    single-line
    clearable
    v-model.trim="searchQuery"
  />
</template>