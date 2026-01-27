<script setup>
import { ref, computed } from 'vue'
import IconArrowSelect from '../icons/VIconArrowSelect.vue'

const props = defineProps({
  modelValue: [String, Number, null],
  options: { type: Array, required: true },
  placeholder: { type: String, default: 'Выберите...' },
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
  <div class="select">
    <div class="select__trigger" @click="isOpen = !isOpen">
      <span
        class="select__value"
        :class="{ select__value_state_placeholder: props.modelValue === null }"
      >
        {{ props.modelValue !== null ? selectedTitle : placeholder }}
      </span>
      <span class="select__arrow"><IconArrowSelect /></span>
    </div>

    <ul v-show="isOpen" class="select__dropdown">
      <li
        v-for="option in props.options"
        :key="option.id"
        class="select__option"
        :class="{ select__option_state_selected: option.id === props.modelValue }"
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
