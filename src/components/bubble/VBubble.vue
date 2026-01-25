<script setup>
defineProps({
  schoolLvls: {
    type: Array,
    default: () => [],
  },
})
</script>
<template>
  <span class="bubble-text" v-for="(lvl, index) in schoolLvls" :key="index">
    {{ lvl }}
  </span>
</template>
<style lang="scss">
@use './VBubble.scss' as *;
</style>
