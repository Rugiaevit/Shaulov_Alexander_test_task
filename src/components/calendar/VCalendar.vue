<script setup>
// npm install @vuepic/vue-datepicker
import { ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

const dates = ref()

// убрал range, т.к. API принимает параметр в виде одиночного Y-m-d
</script>

<template>
  <VueDatePicker v-model="dates" :locale="ru" :formats="{ input: 'Y-m-d' }" />
</template>

<style lang="scss">
@use './VCalendar.scss' as *;

.dp--tp-wrap,
.dp__selection_preview {
  display: none;
}
</style>
