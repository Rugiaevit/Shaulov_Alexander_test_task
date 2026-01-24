<script setup>
defineProps({
  disabled: { type: Boolean, default: false },
  btnType: { type: String, default: undefined },
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="['btn', btnType ? `btn--${btnType}` : null]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
@use './VButton.scss' as *;
</style>
