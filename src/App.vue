<script setup>
import { ref } from 'vue'
import VTable from '@/components/table/VTable.vue'
import VFilter from '@/components/filter/VFilter.vue'
import VHeader from '@/components/header/VHeader.vue'

import VPagination from '@/components/pagination/VPagination.vue'
const currentPage = ref(1)
</script>

<template>
  <div class="main">
    <VHeader />
    <VFilter />
    <VTable />
    <VPagination v-model:currentPage="currentPage" :total-pages="10" />
  </div>
</template>

<style lang="scss">
@use '@/styles/main.scss' as *;
@use '@/styles/fonts.scss' as *;
@use '@/styles/variables.scss' as *;
@use '@/styles/function.scss' as *;

.main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: $color-bg-main;
  border-radius: rem(16);
  padding: rem(24);
  max-width: rem(1632);
  margin: 0 auto;
}
</style>
