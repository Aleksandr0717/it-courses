<template>
  <v-empty-state
    headline="Ошибка 404"
    title="Страница не найдена"
    text="Проверьте правильность пути в адресной строке"
    icon="mdi-alert-circle-outline"
    color="red"
  >
  <template #actions>
    <v-btn class="btn text-none" color="blue" flat to="/">На главную</v-btn>
  </template>
  </v-empty-state>
</template>

<style lang="scss" scoped>

</style>