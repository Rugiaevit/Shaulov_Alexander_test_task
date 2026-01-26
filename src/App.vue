<script setup>
// src\App.vue
import { ref, onMounted, watch } from 'vue'
import VTable from '@/components/table/VTable.vue'
import VFilter from '@/components/filter/VFilter.vue'
import VHeader from '@/components/header/VHeader.vue'
import VPagination from '@/components/pagination/VPagination.vue'

import { fetchFromApiRegions } from '@/core/api-regions.js'
import { fetchFromApiFederalDistricts } from '@/core/api-federal-districts.js'
import { fetchFromApiSchools } from '@/core/api-schools.js'

const regions = ref([])
const federalDistricts = ref([])

const regionValue = ref(null)
const federalDistrictValue = ref(null)

const schools = ref([])

const updatedAt = ref(null)

const loading = ref(false)
const error = ref(null)

const currentPage = ref(1)

const pageSize = ref(9)
const totalPage = ref([])

async function loadData() {
  loading.value = true
  error.value = null
  try {
    const [regionsData, districtsData, schoolsData] = await Promise.all([
      fetchFromApiRegions(),
      fetchFromApiFederalDistricts(),
      fetchFromApiSchools({
        page: currentPage.value,
        count: pageSize.value,
      }),
    ])
    regions.value = regionsData
    federalDistricts.value = districtsData
    schools.value = schoolsData.schools
    totalPage.value = schoolsData.pages_count
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

async function loadSchools() {
  loading.value = true
  try {
    const schoolsData = await fetchFromApiSchools({
      page: currentPage.value,
      count: pageSize.value,
      federal_district_id: federalDistrictValue.value,
      region_id: regionValue.value,
      updated_at: updatedAt.value,
    })
    schools.value = schoolsData.schools
    totalPage.value = schoolsData.pages_count
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Загружаем данные при монтировании компонента
// PS для себя: onMounted аналог useEffect(() => {...},[]); при монтировании
onMounted(() => {
  loadData()
})

// PS для себя: watch аналог useEffect(() => {...},[i]); при монтировании
watch([federalDistrictValue, regionValue, updatedAt], () => {
  currentPage.value = 1
  pageSize.value = 9
})

watch([currentPage, pageSize, federalDistrictValue, regionValue, updatedAt], loadSchools)
</script>

<template>
  <div class="main">
    <VHeader />
    <VFilter
      v-model:regionValue="regionValue"
      v-model:federalDistrictValue="federalDistrictValue"
      v-model:updatedAt="updatedAt"
      :regions="regions"
      :federal-districts="federalDistricts"
    />
    <VTable :schools="schools" />
    <VPagination
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
      :total-pages="totalPage"
    />
  </div>
</template>

<style lang="scss">
@use '@/styles/main.scss' as *;
@use '@/styles/fonts.scss' as *;
@use '@/styles/variables.scss' as *;
@use '@/styles/function.scss' as *;

.main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: $color-bg-main;
  border-radius: 16px;
  padding: rem(24);
  max-width: rem(1632);
  margin: 0 auto;
}
</style>
