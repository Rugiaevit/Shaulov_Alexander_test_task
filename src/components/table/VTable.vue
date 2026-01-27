<script setup>
import { ref, computed } from 'vue'
import IconArrowBot from '../icons/VIconArrowBot.vue'
import IconArrowTop from '../icons/VIconArrowTop.vue'

import IconNoSelect from '../icons/VIconNoSelect.vue'
import IconSelect from '../icons/VIconSelect.vue'
import IconNotAllSelect from '../icons/VIconNotAllSelect.vue'

import Bubble from '@/components/bubble/VBubble.vue'

const props = defineProps({
  schools: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    required: true,
    default: true,
  },
})

// функция для создания заглушки на таблицу
function createPlaceholderData(count = 10) {
  return Array.from({ length: count }, () => ({
    region: '',
    name: '',
    address: '',
    lvls: [],
  }))
}

// Состояние сортировки
const sortBy = ref(null) // имя поля: 'region', 'name', и т.д.
const sortOrder = ref('asc') // 'asc' | 'desc'

// Вычисляемый отсортированный список
const sortedSchools = computed(() => {
  if (props.isLoading) return createPlaceholderData(10)

  if (!sortBy.value) return props.schools

  return [...props.schools].sort((a, b) => {
    const aValue = a[sortBy.value]
    const bValue = b[sortBy.value]

    // Определяем, является ли значение строкой или числом
    const isString = typeof aValue === 'string'

    let comparison = 0

    if (isString) {
      // Сравниваем строки без учёта регистра
      comparison = aValue.localeCompare(bValue, 'ru', { sensitivity: 'base' })
    } else {
      // Числа
      comparison = aValue - bValue
    }

    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

// Функция переключения сортировки при клике на заголовок
function toggleSort(field) {
  if (sortBy.value === field) {
    // Меняем направление
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Новое поле — сортируем по возрастанию
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

function getArrowClass(field, order) {
  if (sortBy.value === field && sortOrder.value === order) {
    return 'arrow active'
  }
  return 'arrow inactive'
}

const tableHeaderCells = [
  {
    text: 'Регион',
    filter: 'region',
  },
  {
    text: 'Название',
    filter: 'name',
  },
  {
    text: 'Адрес',
    filter: 'address',
  },
  {
    text: 'Уровень образования',
    filter: 'lvls',
  },
]

// Хранит индексы или уникальные ID выбранных школ
const selectedSchools = ref(new Set()) // или ref([]), но Set удобнее

// Функция переключения выбора
function toggleSelect(index) {
  if (selectedSchools.value.has(index)) {
    selectedSchools.value.delete(index)
  } else {
    selectedSchools.value.add(index)
  }
}

// Динамическое определение иконки в шапке через <component :is="">
// https://www.w3schools.com/vue/ref_component.php
const headerSelectIcon = computed(() => {
  if (props.isLoading) return IconNoSelect

  const total = props.schools.length
  const selected = selectedSchools.value.size

  if (selected === 0) return IconNoSelect
  if (selected === total) return IconSelect
  return IconNotAllSelect
})

// Выбрать или снять все
function toggleSelectAll() {
  if (props.isLoading) return

  const total = props.schools.length
  const allSelected = selectedSchools.value.size === total

  if (allSelected) {
    selectedSchools.value.clear()
  } else {
    // Выбираем все
    selectedSchools.value = new Set(Array.from({ length: total }, (_, i) => i))
  }
}
</script>

<template>
  <div class="school-table">
    <table class="school-table__layout">
      <thead class="school-table__head">
        <tr class="school-table__header-row">
          <th
            v-for="(cell, index) in tableHeaderCells"
            :key="index"
            @click="toggleSort(cell.filter)"
            class="school-table__header-cell"
          >
            <div class="school-table__header-content">
              <!-- Иконка выбора только в первой колонке -->
              <button
                v-if="index === 0"
                type="button"
                class="school-table__select-icon"
                @click.stop="toggleSelectAll"
                aria-label="Выбрать все"
              >
                <component :is="headerSelectIcon" />
              </button>

              <p class="school-table__header-title">{{ cell.text }}</p>

              <span class="school-table__sort-arrows">
                <span :class="getArrowClass(cell.filter, 'asc')">
                  <IconArrowTop />
                </span>
                <span :class="getArrowClass(cell.filter, 'desc')">
                  <IconArrowBot />
                </span>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="school-table__body">
        <tr
          v-for="(school, index) in sortedSchools"
          :key="index"
          class="school-table__row"
          :class="{ 'school-table__row_state_placeholder': props.isLoading }"
        >
          <td data-label="Регион" class="school-table__cell">
            <div class="school-table__region-cell">
              <button
                v-if="!props.isLoading"
                type="button"
                class="school-table__select-icon"
                @click.stop="toggleSelect(index)"
                :aria-pressed="selectedSchools.has(index)"
                aria-label="Выбрать школу"
              >
                <IconSelect v-if="selectedSchools.has(index)" />
                <IconNoSelect v-else />
              </button>
              <p class="school-table__text">{{ school.region || '\u00A0' }}</p>
            </div>
          </td>
          <td data-label="Название" class="school-table__cell">{{ school.name || '\u00A0' }}</td>
          <td data-label="Адрес" class="school-table__cell">{{ school.address || '\u00A0' }}</td>
          <td data-label="Уровень образования" class="school-table__cell">
            <div class="school-table__bubble-wrapper">
              <Bubble v-if="!props.isLoading" :school-lvls="school.lvls" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@use './VTable.scss' as *;
</style>
