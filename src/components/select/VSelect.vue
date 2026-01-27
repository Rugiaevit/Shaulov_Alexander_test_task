<script setup>
import { ref, computed } from 'vue'
import IconArrowSelect from '../icons/VIconArrowSelect.vue'

const props = defineProps({
  modelValue: [String, Number, null],
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Выберите...',
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

// находим текущий title по modelValue
const selectedTitle = computed(() => {
  const selected = props.options.find((opt) => opt.id === props.modelValue)
  return selected ? selected.title : ''
})

function selectOption(option) {
  emit('update:modelValue', option.id)
  isOpen.value = false
}
</script>

<template>
  <div class="custom-select" :class="{ 'is-open': isOpen }">
    <div class="select-trigger" @click="isOpen = !isOpen">
      <span :class="['select-value', props.modelValue === null ? 'select-placeholder' : '']">
        {{ props.modelValue !== null ? selectedTitle : placeholder }}
      </span>
      <span class="select-arrow"><IconArrowSelect /></span>
    </div>

    <ul v-show="isOpen" class="select-dropdown">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="select-option"
        :class="{ 'is-selected': option.id === props.modelValue }"
        @click="selectOption(option)"
      >
        {{ option.title }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use './VSelect.scss' as *;
</style>
