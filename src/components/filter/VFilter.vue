<script setup>
// src\components\filter\VFilter.vue
import VSelect from '../select/VSelect.vue'

import VCalendar from '../calendar/VCalendar.vue'

const props = defineProps({
  regions: { type: Array, required: true, default: () => [] },
  federalDistricts: { type: Array, required: true, default: () => [] },
  updatedAt: { type: [String, null], default: null },
  regionValue: { type: [Number, null], default: null },
  federalDistrictValue: { type: [Number, null], default: null },
})

defineEmits(['update:regionValue', 'update:federalDistrictValue', 'update:updatedAt'])
</script>
<template>
  <div class="filter">
    <VCalendar :model-value="updatedAt" @update:model-value="$emit('update:updatedAt', $event)" />
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
