<script setup lang="ts">
const props = defineProps<{
  height: number
}>()
</script>

<template>
  <div class="d-flex justify-center align-center" :style="{ height: height + 'px'}">
    <VProgressCircular
      :size="50"
      color="green"
      indeterminate
    />
  </div>
</template>
