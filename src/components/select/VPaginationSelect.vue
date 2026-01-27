<script setup>
// src\components\select\VPaginationSelect.vue
import { ref, computed } from 'vue'
import IconArrowSelect from '../icons/VIconArrowSelect.vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Выберите...' },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

// находим текущий title по modelValue
const selectedTitle = computed(() => {
  const selected = props.options.find((opt) => opt.value === props.modelValue)
  return selected ? selected.title : props.placeholder
})

function selectOption(option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}
</script>

<template>
  <div class="pagination-select" :class="{ 'pagination-select_state_open': isOpen }">
    <div class="pagination-select__trigger" @click="isOpen = !isOpen">
      <span class="pagination-select__value">
        {{ selectedTitle || placeholder }}
      </span>
      <span class="pagination-select__arrow"><IconArrowSelect /></span>
    </div>

    <ul v-show="isOpen" class="pagination-select__dropdown">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="pagination-select__option"
        :class="{ 'pagination-select__option_state_selected': option.value === props.modelValue }"
        @click="selectOption(option)"
      >
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use './VPaginationSelect.scss' as *;
</style>
