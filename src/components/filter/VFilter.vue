<script setup>
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
    <div class="filter__field">
      <VCalendar
        :model-value="props.updatedAt"
        @update:model-value="$emit('update:updatedAt', $event)"
      />
    </div>
    <div class="filter__field">
      <VSelect
        :model-value="props.federalDistrictValue"
        @update:model-value="$emit('update:federalDistrictValue', $event)"
        :options="props.federalDistricts"
        placeholder="Выберите федеральный округ"
      />
    </div>
    <div class="filter__field">
      <VSelect
        :model-value="props.regionValue"
        @update:model-value="$emit('update:regionValue', $event)"
        :options="props.regions"
        placeholder="Выберите регион"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use './VFilter.scss';
</style>
