<script setup lang="ts">
import type { IAlert } from '@/interfaces';

const props = defineProps<{
  alertInfo: IAlert
}>();
</script>

<template>
  <div class="alert" v-if="Object.values(alertInfo).length">
    <v-alert
      :icon="'$' + props.alertInfo?.type"
      border
      :width="$vuetify.display.mobile ? 300 : 350"
      :border-color="props.alertInfo?.type"
      elevation="5"
    >
    <template #prepend>
      <v-icon :color="props.alertInfo?.type"></v-icon>
    </template>
      {{ props.alertInfo?.message }}
    </v-alert>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  position: fixed;
  z-index: 999;
  right: 0;
  top: 60px;
}
</style>