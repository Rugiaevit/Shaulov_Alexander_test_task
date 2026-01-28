<script setup>
import { ref, onMounted, watch } from 'vue'
import VTable from '@/components/table/VTable.vue'
import VFilter from '@/components/filter/VFilter.vue'
import VHeader from '@/components/header/VHeader.vue'
import VPagination from '@/components/pagination/VPagination.vue'
import VPageError from '@/components/error/VPageError.vue'

import { fetchFromApiRegions } from '@/core/api-regions.js'
import { fetchFromApiFederalDistricts } from '@/core/api-federal-districts.js'
import { fetchFromApiSchools } from '@/core/api-schools.js'

// // PS для себя: ref() - аналог useState()
const regions = ref([])
const federalDistricts = ref([])
const schools = ref([])
const totalPages = ref(1)

const regionValue = ref(null)
const federalDistrictValue = ref(null)
const updatedAt = ref(null)
const isLoading = ref(true)
const error = ref(null)

const currentPage = ref(1)
const pageSize = ref(10)

async function loadData() {
  isLoading.value = true
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
    totalPages.value = schoolsData.pages_count
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

async function loadSchools() {
  isLoading.value = true
  try {
    const schoolsData = await fetchFromApiSchools({
      page: currentPage.value,
      count: pageSize.value,
      federal_district_id: federalDistrictValue.value,
      region_id: regionValue.value,
      updated_at: updatedAt.value,
    })
    schools.value = schoolsData.schools
    totalPages.value = schoolsData.pages_count
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Загружаем данные при монтировании компонента
// PS для себя: onMounted аналог useEffect(() => {...},[]); при монтировании
onMounted(() => {
  loadData()
})

// PS для себя: watch аналог useEffect(() => {...},[i]); при монтировании
// зависимости пишутся спереди просто переменной или массивом переменных
watch([federalDistrictValue, regionValue, updatedAt], () => {
  currentPage.value = 1
  pageSize.value = 10
})

watch([currentPage, pageSize, federalDistrictValue, regionValue, updatedAt], loadSchools)

// PS по шаблону
// пропсы передаются через : , :regions="regions" - такой пропс просто передает данные в компонент
// если пропс передается через v-model, то такой пропас должен изменяться в компоненте
// v-if="" - условие отрисовки компонента <VPageError v-if="error" :error="error" /> - если error !== null/undefined

//TODO: ДОделать сопроводительные коментарии и сделать сопроводительный документ, сдать работу
</script>

<template>
  <div>
    <div class="school-list">
      <VHeader />
      <VFilter
        v-model:regionValue="regionValue"
        v-model:federalDistrictValue="federalDistrictValue"
        v-model:updatedAt="updatedAt"
        :regions="regions"
        :federal-districts="federalDistricts"
      />
      <VTable :schools="schools" :is-loading="isLoading" />
      <VPagination
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        :total-pages="totalPages"
      />
    </div>
    <VPageError v-if="error" :error="error" />
  </div>
</template>

<style lang="scss">
@use '@/styles/main.scss' as *;
@use '@/styles/fonts.scss' as *;
@use '@/styles/variables.scss' as *;
@use '@/styles/function.scss' as *;

.school-list {
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
