<script setup>
import VButton from '../button/VButton.vue'
</script>
<template>
  <div class="header">
    <h1 class="header__title">Таблица учреждений</h1>
    <div class="header__control">
      <VButton btn-type="accent" :save="true">Скачать</VButton>
    </div>
  </div>
</template>
<style lang="scss">
@use './VHeader.scss' as *;
</style>
