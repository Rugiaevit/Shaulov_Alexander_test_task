<script setup>
import { ref } from 'vue'
import IconSearch from '../icons/VIconSearch.vue'

defineProps({
  modelValue: { type: String, default: '' },
  block: { type: Boolean, default: false },
})

defineEmits(['update:modelValue'])

// ссылка на DOM
const inputRef = ref(null)

// Перевести фокус на input
function focusInput() {
  inputRef.value?.focus()
}
</script>

<template>
  <div class="input-wrapper" @click="focusInput">
    <input
      ref="inputRef"
      v-bind="$attrs"
      class="input"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
    <IconSearch />
  </div>
</template>

<style lang="scss">
@use './VInput.scss' as *;
</style>
