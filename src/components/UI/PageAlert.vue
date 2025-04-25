<script setup lang="ts">
const props = defineProps<{
  alert: { type: string, message: string }
}>()
</script>

<template>
  <div class="alert" v-if="Object.values(alert)?.length">
    <v-alert
      :icon="'$' + props.alert.type"
      border
      width="350"
      :border-color="props.alert?.type"
      elevation="5"
    >
    <template #prepend>
      <v-icon :color="props.alert?.type"></v-icon>
    </template>
      {{ props.alert?.message }}
    </v-alert>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  position: fixed;
  right: 0;
  top: 60px;
}
</style>