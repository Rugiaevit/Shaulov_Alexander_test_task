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
  <div class="custom-select-pagination" :class="{ 'is-open': isOpen }">
    <div class="select-pagination-trigger" @click="isOpen = !isOpen">
      <span class="select-pagination-value">
        {{ selectedTitle || placeholder }}
      </span>
      <span class="select-pagination-arrow"><IconArrowSelect /></span>
    </div>

    <ul v-show="isOpen" class="select-pagination-dropdown">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="select-pagination-option"
        :class="{ 'is-selected': option.value === props.modelValue }"
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
