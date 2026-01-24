<script setup>
import { ref } from 'vue'
import FlatPickr from './FlatPickr.vue'
import IconCalendar from '../icons/VIconCalendar.vue'

const flatPickrRef = ref(null)

// Вызывает событие openCalendar
// Сделано чтобы календарь открывался и при нажатии на контейнер
function focusInput() {
  flatPickrRef.value?.openCalendar()
}
</script>

<template>
  <div class="calendar-input-wrapper" @click="focusInput">
    <FlatPickr ref="flatPickrRef" @click="focusInput" />
    <IconCalendar />
  </div>
</template>

<style lang="scss">
@use './DateRangePicker.scss' as *;
</style>
