<script setup>
// src\components\pagination\VPagination.vue
import { computed } from 'vue'
import IconPaginationNext from '@/components/icons/VIconPaginationNext.vue'
import IconPaginationPrev from '@/components/icons/VIconPaginationPrev.vue'
import VPaginationSelect from '../select/VPaginationSelect.vue'
// import VSelect from '../select/VSelect.vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true, validator: (v) => v >= 1 },
  pageSize: { type: Number, required: true },
  siblingCount: { type: Number, default: 1 },
})

const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const changePage = (page) => {
  if (typeof page === 'number' && page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

// генерация массива страниц с "..." где нужно
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

// PS количество записей на одной странице может быть 36,
// при запросе на одну страницу более 36 выдавало ошибку 500
// по этому будем делатьградацию

const printCount = [
  { value: 9, title: '9' },
  { value: 18, title: '18' },
  { value: 27, title: '27' },
  { value: 36, title: '36' },
]

//  @update:model-value="$emit('update:pageSize', $event)" - связка между App.vue и VPaginationSelect.vue,
// для проброски emit в более глубокую вложенность
</script>

<template>
  <div class="pagination">
    <div class="pagination-page-control">
      <button
        class="pagination-btn-prev"
        :disabled="currentPage <= 1"
        @click="changePage(currentPage - 1)"
      >
        <IconPaginationPrev />
      </button>

      <span
        v-for="(page, index) in pages"
        :key="index"
        class="pagination-page"
        :class="{
          'pagination-page--active': page === currentPage,
          'pagination-page--dots': page === '...',
        }"
        @click="changePage(page)"
      >
        {{ page }}
      </span>

      <button
        class="pagination-btn-next"
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
      >
        <IconPaginationNext />
      </button>
    </div>
    <div class="pagination-limit-control">
      <p>1 - {{ pageSize }} записей</p>
      <div class="pagination-limit-selector">
        <p>Показывать</p>
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
