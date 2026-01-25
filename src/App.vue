<script setup>
import { ref } from 'vue'
import VInputSearch from '@/components/input/VInputSearch.vue'
import VSelect from '@/components/select/VSelect.vue'
import VButton from '@/components/button/VButton.vue'
import VTable from '@/components/table/VTable.vue'

import DateRangePicker from './components/calendar/DateRangePicker.vue'
const selectedRange = ref([])

const name = ref('')
const country = ref('')
const federalDistricts = ref([
  { value: '1', label: 'federal district 1' },
  { value: '2', label: 'federal district 2' },
])
const regions = ref([
  { value: '1', label: 'region 1' },
  { value: '2', label: 'region 2' },
])

const federalDistrictValue = ref(null)
const regionValue = ref(null)

const submit = () => console.log({ name: name.value, country: country.value })
</script>

<template>
  <div style="max-width: 400px; margin: 0 auto; padding: 16px">
    <VInputSearch v-model="name" placeholder="Имя" />
    <VSelect
      v-model="federalDistrictValue"
      :options="federalDistricts"
      placeholder="Выберите федеральный округ"
      clear-label="Не выбрано"
    />
    <VSelect
      v-model="regionValue"
      :options="regions"
      placeholder="Выберите регион"
      clear-label="Не выбрано"
    />

    <VButton btn-type="primary" @click="submit">Отмена</VButton>
    <VButton btn-type="secondary" @click="submit">Отмена</VButton>
    <VButton btn-type="accent" @click="submit">Отмена</VButton>

    <DateRangePicker v-model="selectedRange" />
  </div>
  <VTable />
</template>

<style lang="scss">
@use '@/styles/main.scss' as *;
@use '@/styles/fonts.scss' as *;
</style>
