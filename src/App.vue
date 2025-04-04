<template>
  <v-app>
    <TheNavbar />
    <v-main>
      <RouterView />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script setup lang="ts">
import TheNavbar from './components/UI/TheNavbar.vue';
import TheFooter from './components/UI/TheFooter.vue';
</script>

<style lang="scss">
</style>
