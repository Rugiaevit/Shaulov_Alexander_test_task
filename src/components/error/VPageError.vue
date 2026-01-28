<script setup>
import { watch, onUnmounted } from 'vue'

//PS объявление пропсов, похоже на TS
const props = defineProps({
  error: { type: String, default: undefined },
})

// watch аналог useEffect(() => {...},[i]);
watch(
  () => props.error,
  (newError) => {
    document.body.style.overflow = newError ? 'hidden' : ''
  },
  { immediate: true },
)

// сбросить overflow при размонтировании
// onMounted аналог useEffect(() => {...},[]);
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="page-error">
    <div class="page-error__wrapper">
      <div class="page-error__text">
        <p>Что-то пошло не так!</p>
        <p>Попробуйте зайти позже.</p>
      </div>
      <div v-if="props.error" class="page-error__msg">{{ props.error }}</div>
    </div>
  </div>
</template>

<style lang="scss">
@use './VPageError.scss';
</style>
