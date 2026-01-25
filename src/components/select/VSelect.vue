<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  options: {
    type: Array,
    required: true,
    // валидация options, что option содержит value !== undefined и label !== undefined
    // validator - спец свойство в Vue для проверки
    validator: (arr) =>
      arr.every((option) => option.value !== undefined && option.label !== undefined),
  },
  placeholder: { type: String, default: 'Выберите...' },
  clearLabel: { type: String, default: '—' },
  selectFirst: { type: Boolean, default: false },
})

// Событие "выбор" селектора
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const displayText = computed(() => {
  // если значение в select рнано null отображаем placeholder
  if (props.modelValue == null) return props.placeholder
  // иначе ищем нужный вариант в options
  const selected = props.options.find((o) => o.value === props.modelValue)
  return selected ? selected.label : props.placeholder
})

function select(value) {
  // Передать родителю выбранное значение
  emit('update:modelValue', value)
  isOpen.value = false
}

// выбрать первый вариант, если передан selectFirst
// и ничего не выбрано
// onMounted аналог useEffect, производит действие после монтирование в dom
onMounted(() => {
  if (props.selectFirst && props.modelValue == null && props.options.length > 0) {
    emit('update:modelValue', props.options[0].value)
  }
})

// TODO: запомнить на будущее
// v-for - это цыкл для вывода всех option из options
// v-show="true/false" - показывает или скрывает элемент (но остаётся в DOM)
// @click ="" - событие click, @click="isOpen = !isOpen" - установить isOpen как false

//@click.stop - остановка события click.
// Нужно чтобы click не открывал и не закрывал повторно список
// Без него отрабатывал павторно @click="isOpen = !isOpen" у родителя
// Из-за чего список открывал повторно

// :class="" - добавляет класс при каком-то условии
// :class="{ 'is-selected': option.value === props.modelValue }" - добавить класс is-selected если выбран текуший option

// select--trigger - имитация самого select, чисто служит для отображения пользователю стилей
// Использую его чтобы только для удобства стилизации
</script>

<template>
  <div class="select" @click="isOpen = !isOpen">
    <div class="select--trigger" :class="{ 'is-placeholder': props.modelValue == null }">
      {{ displayText }}
    </div>

    <ul v-show="isOpen" class="select--options" @click.stop>
      <li v-if="!selectFirst" class="select--option" @click="select(null)">
        {{ clearLabel }}
      </li>

      <li
        v-for="option in options"
        :key="option.value"
        class="select--option"
        :class="{ 'is-selected': option.value === props.modelValue }"
        @click="select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use './VSelect.scss' as *;
</style>
