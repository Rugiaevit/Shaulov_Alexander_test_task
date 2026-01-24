<script>
// бибилотека Flatpickr
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Russian } from 'flatpickr/dist/l10n/ru.js'

function formatDate(date) {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default {
  components: {
    flatPickr,
  },
  data() {
    return {
      dateRange: [],
      config: {
        mode: 'range',
        dateFormat: 'd.m.Y',
        monthSelectorType: 'static',
        locale: Russian,
        onChange: this.handleDateChange,
        onOpen: this.handleOpen,
        prevArrow: `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.06065 12.5306L1.06065 6.52527L7.06065 0.530579" stroke="#0E0E10" stroke-width="1.5" stroke-miterlimit="10"/></svg>`,
        nextArrow: `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.530563 12.5306L6.53056 6.52527L0.530563 0.530579" stroke="#0E0E10" stroke-width="1.5" stroke-miterlimit="10"/></svg>`,
        // Важно: не используем onReady для initialValue — он не нужен
        onReady: () => {
          document.querySelector('.cur-year').readOnly = true
          document.querySelector('.arrowUp').style.display = 'none'
          document.querySelector('.arrowDown').style.display = 'none'
        },
      },
    }
  },
  methods: {
    handleDateChange(selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        const formatted = `${formatDate(selectedDates[0])} — ${formatDate(selectedDates[1])}`
        instance.input.value = formatted
      } else {
        instance.input.value = ''
      }
    },

    openCalendar() {
      if (this.$refs.flatpickr?.fp) {
        this.$refs.flatpickr.fp.open()
      }
    },
  },
}
</script>

<template>
  <flat-pickr
    ref="flatpickr"
    v-model="dateRange"
    :config="config"
    class="calendar-input"
    placeholder="Выберите период"
  />
</template>

<style lang="scss">
@use './FlatPickr.scss' as *;
</style>
