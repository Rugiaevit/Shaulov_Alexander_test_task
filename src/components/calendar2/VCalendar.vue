<script setup>
// npm install @vuepic/vue-datepicker
import { ref } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ru } from 'date-fns/locale'

const dates = ref()
</script>

<template>
  <VueDatePicker v-model="dates" :locale="ru" range auto-apply />
</template>

<style lang="scss">
@use './VCalendar.scss' as *;

.dp--tp-wrap,
.dp__selection_preview {
  display: none;
}
</style>
