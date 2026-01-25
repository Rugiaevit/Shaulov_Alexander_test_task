<script setup>
import { ref } from 'vue'
import VSelect from '../select/VSelect.vue'

// import DateRangePicker from '../calendar/DateRangePicker.vue'
import DateRangePicker from '../calendar2/VCalendar.vue'

const selectedRange = ref([])
// const selectedRange = ref(null)

const federalDistricts = ref([
  { value: '', label: 'Не выбрано' },
  { value: '1', label: 'federal district 1' },
  { value: '2', label: 'federal district 2' },
])

const regions = ref([
  { value: '', label: 'Не выбрано' },
  { value: '1', label: 'region 1' },
  { value: '1', label: 'region 1' },
  { value: '2', label: 'region 2' },
])

const federalDistrictValue = ref(null)
const regionValue = ref(null)
</script>
<template>
  <div class="filter">
    <DateRangePicker v-model="selectedRange" />
    <VSelect
      v-model="federalDistrictValue"
      :options="federalDistricts"
      placeholder="Выберите федеральный округ"
    />
    <VSelect v-model="regionValue" :options="regions" placeholder="Выберите регион" />
  </div>
</template>
<style lang="scss">
@use './VFilter.scss' as *;
</style>
