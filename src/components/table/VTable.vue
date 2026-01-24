<script setup>
import { ref, computed } from 'vue'

// Исходные данные
const shools = [
  { region: 'Москва', name: 'Школа №1', adres: 'ул. Ленина, 1', lvl: 'Среднее' },
  { region: 'СПб', name: 'Гимназия №5', adres: 'Невский пр., 10', lvl: 'Основное' },
  { region: 'Казань', name: 'Лицей №2', adres: 'пр. Победы, 5', lvl: 'Среднее' },
  { region: 'Екатеринбург', name: 'Школа №10', adres: 'ул. Карла Либкнехта, 20', lvl: 'Начальное' },
  { region: 'Новосибирск', name: 'Школа №7', adres: 'ул. Советская, 15', lvl: 'Среднее' },
]

// Состояние сортировки
const sortBy = ref(null) // имя поля: 'region', 'name', и т.д.
const sortOrder = ref('asc') // 'asc' | 'desc'

// Вычисляемый отсортированный список
const sortedShools = computed(() => {
  if (!sortBy.value) return shools

  return [...shools].sort((a, b) => {
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
</script>

<template>
  <div class="table">
    <table border="1">
      <thead>
        <tr>
          <th @click="toggleSort('region')" style="cursor: pointer">
            Регион {{ sortBy === 'region' ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '' }}
          </th>
          <th @click="toggleSort('name')" style="cursor: pointer">
            Название {{ sortBy === 'name' ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '' }}
          </th>
          <th @click="toggleSort('adres')" style="cursor: pointer">
            Адрес {{ sortBy === 'adres' ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '' }}
          </th>
          <th @click="toggleSort('lvl')" style="cursor: pointer">
            Уровень образования {{ sortBy === 'lvl' ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '' }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shool, index) in sortedShools" :key="index">
          <!-- Лучше использовать уникальный id, но если его нет — index допустим временно -->
          <td>{{ shool.region }}</td>
          <td>{{ shool.name }}</td>
          <td>{{ shool.adres }}</td>
          <td>{{ shool.lvl }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
@use './VTable.scss' as *;

/* Дополнительно можно стилизовать заголовки */
th {
  user-select: none; /* запрет выделения текста при клике */
  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
