<script setup>
// src\components\filter\VFilter.vue
import { ref } from 'vue'
import VSelect from '../select/VSelect.vue'

import VCalendar from '../calendar/VCalendar.vue'

const props = defineProps({
  regions: { type: Array, required: true, default: () => [] },
  federalDistricts: { type: Array, required: true, default: () => [] },
  regionValue: { type: [Number, null], default: null },
  federalDistrictValue: { type: [Number, null], default: null },
})

defineEmits(['update:regionValue', 'update:federalDistrictValue'])

const selectedRange = ref([])
</script>
<template>
  <div class="filter">
    <VCalendar v-model="selectedRange" />
    <VSelect
      :model-value="federalDistrictValue"
      @update:model-value="$emit('update:federalDistrictValue', $event)"
      :options="props.federalDistricts"
      placeholder="Выберите федеральный округ"
    />
    <VSelect
      :model-value="regionValue"
      @update:model-value="$emit('update:regionValue', $event)"
      :options="props.regions"
      placeholder="Выберите регион"
    />
  </div>
</template>
<style lang="scss">
@use './VFilter.scss' as *;
</style>
