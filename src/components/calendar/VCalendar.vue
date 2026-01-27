<script setup>
// библа npm install @vuepic/vue-datepicker
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

const props = defineProps({
  modelValue: {
    type: [String, null],
    default: null,
  },
})

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
</script>

<template>
  <VueDatePicker
    v-model="internalValue"
    :locale="ru"
    :formats="{ input: 'dd MMMM yyyy' }"
    model-type="yyyy-MM-dd"
    auto-apply
  />
</template>

<style lang="scss">
@use './VCalendar.scss' as *;
</style>
