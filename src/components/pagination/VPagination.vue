<script setup>
import { computed } from 'vue'
import IconPaginationNext from '@/components/icons/VIconPaginationNext.vue'
import IconPaginationPrev from '@/components/icons/VIconPaginationPrev.vue'
import VPaginationSelect from '../select/VPaginationSelect.vue'

//PS объявление пропсов, похоже на TS
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true, validator: (v) => v >= 1 },
  pageSize: { type: Number, required: true },
  siblingCount: { type: Number, default: 1 },
})

// PS emits - для обновления переданной переменной через v-model
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const changePage = (page) => {
  if (typeof page === 'number' && page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

// генерация массива страниц с "..." где нужно
//PS computed - используется для вычеслений с реактивными (ref()) переменными
const pages = computed(() => {
  const { currentPage, totalPages, siblingCount } = props

  // eсли всего 1–2 страницы — просто [1, 2]
  if (totalPages <= 2 + siblingCount * 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(1, currentPage - siblingCount)
  const rightSibling = Math.min(totalPages, currentPage + siblingCount)

  const shouldShowLeftDots = leftSibling > 2
  const shouldShowRightDots = rightSibling < totalPages - 1

  const items = []

  // всегда показываем первую страницу
  items.push(1)

  if (shouldShowLeftDots) {
    items.push('...')
  }

  // добвление соседних страниц
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) {
      items.push(i)
    }
  }

  if (shouldShowRightDots) {
    items.push('...')
  }

  // всегда показываем последнюю страницу
  if (totalPages > 1) {
    items.push(totalPages)
  }

  return items
})

// значения для селекторора выбора количества записей
const printCount = [
  { value: 10, title: '10' },
  { value: 20, title: '20' },
  { value: 30, title: '30' },
  { value: 40, title: '40' },
  { value: 50, title: '50' },
]

//PS  @update:model-value="$emit('update:pageSize', $event)" - связка между App.vue и VPaginationSelect.vue,
// для проброски emit в более глубокую вложенность

//PS @click="" привязка к ивенту onClick

//PS :class="{ class-name : props.modelValue === null }" - условие для добавление класса
</script>

<template>
  <div class="pagination">
    <div class="pagination__page-control">
      <button
        class="pagination__btn-prev"
        :disabled="currentPage <= 1"
        @click="changePage(currentPage - 1)"
      >
        <IconPaginationPrev />
      </button>

      <span
        v-for="(page, index) in pages"
        :key="index"
        class="pagination__page"
        :class="{
          pagination__page_state_active: page === currentPage,
          pagination__page_state_dots: page === '...',
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </span>

      <button
        class="pagination__btn-next"
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
      >
        <IconPaginationNext />
      </button>
    </div>
    <div class="pagination__limit-control">
      <p class="pagination__info">1 - {{ pageSize }} записей</p>
      <div class="pagination__limit-selector">
        <p class="pagination__label">Показывать</p>
        <VPaginationSelect
          :model-value="pageSize"
          @update:model-value="$emit('update:pageSize', $event)"
          :options="printCount"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './VPagination.scss' as *;
</style>
