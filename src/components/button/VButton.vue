<script setup>
import IconSave from '../icons/VIconSave.vue'

defineProps({
  disabled: { type: Boolean, default: false },
  btnType: { type: String, default: undefined },
  save: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
  <button
    :class="['btn', btnType ? `btn--${btnType}` : null]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="save" class="btn__icon"><IconSave /></span>
    <span class="btn__text"><slot></slot></span>
  </button>
</template>

<style lang="scss">
@use './VButton.scss';
</style>
