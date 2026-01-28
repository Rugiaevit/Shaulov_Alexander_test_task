<script setup>
import IconSave from '../icons/VIconSave.vue'

// объявление пропсов, похоже на TS
defineProps({
  disabled: { type: Boolean, default: false },
  btnType: { type: String, default: undefined },
  save: { type: Boolean, default: false },
})

// emit для обработки клика
defineEmits(['click'])

//PS @click="" привязка к ивенту onClick

//PS :class="{ class-name : props.modelValue === null }" - условие для добавление класса
//PSS чтобы не писать отдель class и :class можно занести через массив :class="['btn', btnType ? `btn--${btnType}` : null]"
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
