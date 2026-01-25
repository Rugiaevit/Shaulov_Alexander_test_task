<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: undefined },
  options: {
    type: Array,
    required: true,
    validator: (arr) =>
      arr.every((option) => option.value !== undefined && option.label !== undefined),
  },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const displayText = computed(() => {
  const selected = props.options.find((o) => o.value === props.modelValue)
  return selected ? selected.label : (props.options[0]?.label ?? '')
})

function select(value) {
  emit('update:modelValue', value)
  isOpen.value = false
}

// всегда выбираем первый элемент, если ничего не выбрано
onMounted(() => {
  if (props.modelValue == null && props.options.length > 0) {
    emit('update:modelValue', props.options[0].value)
  }
})
</script>

<template>
  <div class="pagination-select" @click="isOpen = !isOpen">
    <div class="pagination-select--trigger">
      {{ displayText }}
    </div>

    <ul v-show="isOpen" class="pagination-select--options" @click.stop>
      <li
        v-for="option in options"
        :key="option.value"
        class="pagination-select--option"
        :class="{ 'is-selected': option.value === props.modelValue }"
        @click="select(option.value)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use './VPaginationSelect.scss' as *;
</style>
