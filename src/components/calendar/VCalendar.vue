<script setup>
// библа npm install @vuepic/vue-datepicker
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

//PS объявление пропсов, похоже на TS
const props = defineProps({
  modelValue: {
    type: [String, null],
    default: null,
  },
})

// PS emits - для обновления переданной переменной через v-model
const emit = defineEmits(['update:modelValue'])

// Пришлось применить чтобы связать библиотечный календарь с updatedAt
const internalValue = computed({
  // get() — отдаёт текущее значение из родителя (VFilter.vue)
  get() {
    return props.modelValue
  },
  // set(value) — сообщает родителю (VFilter.vue) об изменении
  set(value) {
    emit('update:modelValue', value)
  },
})

//PS :formats="{ input: 'dd MMMM yyyy' }" - формат записи даты в input
// model-type="yyyy-MM-dd" - формат записи для занесения в переменную
</script>

<template>
  <div class="calendar">
    <VueDatePicker
      v-model="internalValue"
      :locale="ru"
      :formats="{ input: 'dd MMMM yyyy' }"
      model-type="yyyy-MM-dd"
      :placeholder="'Выберите дату обновления'"
    />
  </div>
</template>

<style lang="scss">
@use './VCalendar.scss';
</style>
