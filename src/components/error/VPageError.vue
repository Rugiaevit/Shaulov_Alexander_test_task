<script setup>
const props = defineProps({
  error: { type: String, default: undefined },
})

document.body.style.overflow = props.error ? 'hidden' : ''
</script>
<template>
  <div class="page-error">
    <div class="page-error-wrapper">
      <div class="page-error-text">
        <p>Что-то пошло не так!</p>
        <p>Попробуйте зайти позже.</p>
      </div>
      <div v-if="props.error" class="page-error-msg">{{ props.error }}</div>
    </div>
  </div>
</template>
<style lang="scss">
@use './VPageError.scss' as *;
</style>
